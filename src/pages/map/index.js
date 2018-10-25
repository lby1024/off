import React from 'react'
import {Card, Breadcrumb} from 'antd'
import {MapWrapper} from './style'
import {FilterForm} from '../order'
import {get_map_data02} from '../../api/get_data'
import start_pic from '../../static/start_point.png'
import end_pic from '../../static/end_point.png'
import bike_pic from '../../static/bike.jpg'

export default class MapPage extends React.Component {
    render () {
        return (
            <MapWrapper>
                <Card>
                    <FilterForm/>
                </Card>
                <Map/>
            </MapWrapper>
        )
    }
}

class Map extends React.Component {

    state = {
        map: null,
        bike_list: null,    // 自行车停放点
        route_list: null,   // 行驶路线
        service_list: null, // 覆盖区域
        end: null,          // 终点
        start: null         // 起点
    }
    componentWillMount() {
        this._get_data()
    }
    _get_data () {
        get_map_data02()
        .then(res=>{
            let {bike_list, route_list, service_list} = res.data.data
            bike_list = this.clean_data(bike_list)
            route_list = this.clean_data(route_list)
            let start = route_list[0]
            let end = route_list[route_list.length-1]
            this.setState({bike_list, route_list, service_list, start, end})
            this.render_map()
        })
    }
    // ['lon,lat', 'lon,lat', ...] =====>> [{lon, lat},{lon, lat}, ...]
    clean_data (list) {
        return list.map(item=>{
            item = item.split(',')
            let lon = item[0]
            let lat = item[1]
            return {lon, lat}
        })
    }
    // 渲染地图
    render_map () {
        let {end} = this.state
        // 1 : 创建地图
        let map = new window.BMap.Map("map02")
        this.setState({map})
        // 2 : 地图要显示的位置
        let point = new window.BMap.Point(end.lon, end.lat)
        // 3 : 显示地图
        // --- 参数1 ---> 要显示的位置
        // --- 参数2 ---> 显示的比例
        map.centerAndZoom(point, 12)
        // 4 : 添加挂件
        this.addMapControl()
        // 5 : 绘制行驶路线
        this.route()
        // 6 : 绘制 ---> 服务区
        this.area()
        // 7 : 绘制 ---> 待使用的自行车
        this.bikes()
    }
    // 挂件
    addMapControl = () => {
        let {map} = this.state
        // 右上角，添加比例尺
        var top_right_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        var top_right_navigation = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        //添加控件和比例尺
        map.addControl(top_right_control);
        map.addControl(top_right_navigation);
        // 滚动轮变焦
        map.enableScrollWheelZoom(true);
    };
    // 绘制行驶路线
    route () {
        let {start, end, route_list, map} = this.state
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
        let bike_line = route_list.map(item=>new window.BMap.Point(item.lon, item.lat))
        bike_line = new window.BMap.Polyline(
            bike_line, 
            {strokeColor:"#d4237a", strokeWeight:3, strokeOpacity:0.9}
        );
        map.addOverlay(bike_line)
    }
    // 绘制 ---> 服务区
    area () {
        let {service_list, map} = this.state
        // 坐标点
        service_list = service_list.map(item=>new window.BMap.Point(item.lon, item.lat))
        // 坐标点 ---> 图形
        service_list = new window.BMap.Polygon(service_list, {
            strokeColor: 'red',
            strokeWeight: 3,
            strokeOpacity: .9,
            fillColor: '#999',
            fillOpacity: .1
        })
        // 渲染
        map.addOverlay(service_list) 
    }
    // 绘制 ---> 待使用的自行车
    bikes () {
        let {bike_list, map} = this.state
        bike_list.map(item=>{
            let position = new window.BMap.Point(item.lon, item.lat)
            let end_icon = new window.BMap.Icon(bike_pic, new window.BMap.Size(36,42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            });
            let marker_end = new window.BMap.Marker(position,{icon:end_icon});  // 创建标注
            map.addOverlay(marker_end);
        })
    }

    render () {
        return <div className="map">
            <h5>总共有200量车</h5>
            <div className="map02" id="map02"></div>
        </div>
    }
}