import React from 'react';
import {HeaderWrapper, InfoWrapper, DetailWrapper} from './style.js'
import {Card, Button, message} from 'antd'
import { get_map_data } from '../../api/get_data.js'
import start_pic from '../../static/start_point.png'
import end_pic from '../../static/end_point.png'

export default class Detail extends React.Component {

    state = {
        info01: null,
        info02: null,
    }

    componentWillMount() {
        let info = JSON.parse(localStorage.info)
        let info01 = [
            {'title': '用车状态', 'value': info.status},
            {'title': '订单编号', 'value': info.order_sn},
            {'title': '车辆编号', 'value': info.bike_sn},
            {'title': '用户姓名', 'value': info.user_name},
            {'title': '手机号码', 'value': info.mobile}
        ]
        let info02 = [
            {'title': '开始时间', 'value': info.start_time},
            {'title': '结束时间', 'value': info.end_time},
            {'title': '行驶里程', 'value': info.distance},
        ]
        this.setState({info01, info02})
    }

    
    
    render() {
        let {info01, info02} = this.state
        if (info01===null) return <div>loading</div>

        let dom_btn = 
            <Button
                type="primary" >
                原始轨迹
            </Button>

        return (
            <DetailWrapper>
                <Head/>
                <Card title={dom_btn}>
                    <Map/>
                    <Info data={info01} title="基础信息"></Info>
                    <Info data={info02} title="行驶里程"></Info>
                </Card>
            </DetailWrapper>
        )
    }
}

// 地图组件
class Map extends React.Component {
    state = {
        end: null,      // 终点
        start: null,    // 起点
        area: [],       // 覆盖区域的坐标点
        bike_trail: [], // 自行车行驶轨迹 
        map: null       // 地图obj
    }
    componentWillMount() {
        this.get_data()
    }
    get_data () {
        get_map_data()
        .then(res=>{
            if (res.status===200) {
                console.log(res.data.result)
                let data = res.data.result
                let start = data.position_list[0]       
                let end = data.position_list[data.position_list.length-1]
                let bike_trail = data.position_list
                let area = data.area
                this.setState({start, end, bike_trail, area})
                this.render_map()
            }
            else {
                message.error('服务器返回了错误数据 ---> status不为200')
            }
        })
    }
    // 渲染地图
    render_map () {
        let {end} = this.state
        // 创建地图
        let map = new window.BMap.Map("map")
        this.setState({map})
        // 地图要显示的位置 ---> 这里显示自行车的终点(lon,lat--->经纬度)
        let point = new window.BMap.Point(end.lon, end.lat)
        // 显示地图
        // --- 参数1 ---> 要显示的位置
        // --- 参数2 ---> 显示的比例
        map.centerAndZoom(point, 13)
        // 添加控件
        this.addMapControl()
        // 绘制自行车行驶轨迹
        this.bike_trail()
        // 绘制覆盖区域
        this.area()
    }
    // 添加地图控件
    addMapControl = () => {
        let {map} = this.state
        // 右上角，添加比例尺
        let top_right_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT})
        let top_right_navigation = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        //添加控件和比例尺
        map.addControl(top_right_control);
        map.addControl(top_right_navigation);
        // 滚动轮变焦
        map.enableScrollWheelZoom(true);
    }
    // 绘制行驶轨迹
    bike_trail () {
        let {start, end, bike_trail, map} = this.state
        // 1 : 绘制起点
        let start_position = new window.BMap.Point(start.lon, start.lat);
        let start_icon = new window.BMap.Icon(start_pic, new window.BMap.Size(36,42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        let marker_start = new window.BMap.Marker(start_position,{icon:start_icon});    // 创建标注
        map.addOverlay(marker_start);
        // 2 : 绘制终点
        let end_position = new window.BMap.Point(end.lon, end.lat)
        let end_icon = new window.BMap.Icon(end_pic, new window.BMap.Size(36,42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        let marker_end = new window.BMap.Marker(end_position,{icon:end_icon});  // 创建标注
        map.addOverlay(marker_end);
        // 3 : 绘制自行车行驶轨迹
        let bike_line = bike_trail.map(item=>new window.BMap.Point(item.lon, item.lat))
        bike_line = new window.BMap.Polyline(
            bike_line, 
            {strokeColor:"#d4237a", strokeWeight:3, strokeOpacity:0.9}
        );
        map.addOverlay(bike_line)
    }
    // 绘制覆盖区域
    area () {
        let {area, map} = this.state
        // 坐标点
        area = area.map(item=>new window.BMap.Point(item.lon, item.lat))
        // 坐标点 ---> 图形
        area = new window.BMap.Polygon(area, {
            strokeColor: 'red',
            strokeWeight: 3,
            strokeOpacity: .9,
            fillColor: '#999',
            fillOpacity: .3
        })
        // 渲染
        map.addOverlay(area) 
    }

    render () {
        return (
            <div 
                id="map"
                className="map">
            </div>
        )
    }
}

// 头部组件
class Head extends React.Component {

    render () {
        return (
            <HeaderWrapper>
                <div className="left">
                    <i className="logo"></i>
                    <span>详情页面</span>
                </div>
                <div className="right">
                    <span>admin</span>
                    <span>腿出</span>
                </div>
            </HeaderWrapper>
        )
    }
}

// 详细信息组件
class Info extends React.Component {
    render () {
        let {data, title} = this.props
        let dom_item = data.map(item=>
            <div key={item.title}>
                <span>{item.title}</span>
                <span>{item.value}</span>
            </div>
        )
        return (
            <InfoWrapper>
                <h3>{title}</h3>
                {dom_item}
            </InfoWrapper>
        )
    }
}