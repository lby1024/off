import React from 'react'
import {Card} from 'antd'
import {BarWrapper} from './style'
// echarts======echarts======echarts======echarts======echarts======
import ReactEcharts from 'echarts-for-react';
// 移入样式
import theme from '../theme'
// 引入核心
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

export default class Bar extends React.Component {

    componentWillMount () {
        echarts.registerTheme('theme', theme)
    }

    get_option01 = () => {
        return {
            title: {text: '用户骑行订单'},
            tooltip: {trigger: 'axis'},
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    data: [1000, 2000, 1200, 1800, 2400, 3000, 800],
                    itemStyle: {color: '#fce72a'}
                }
            ]
        }
    }
    get_option02 = () => {
        return {
            title: {text: '用户骑行订单'},
            tooltip: {trigger: 'axis'},
            legend: {data: ['摩拜', 'offo', '小蓝']},
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1000, 2000, 1200, 1800, 2400, 3000, 800],
                },
                {
                    name: 'offo',
                    type: 'bar',
                    data: [1500, 1000, 500, 800, 1700, 2000, 1900],
                    itemStyle: {color: '#fce72a'}
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [2000, 1000, 1800, 800, 3000, 1200, 1500],
                    itemStyle: {color: 'skyblue'}
                }
            ]
        }
    }


    render () {
        return <BarWrapper>
            <Card title="柱形图01">
                <ReactEcharts 
                    theme='theme'
                    option={this.get_option01()}
                    style={{height: 500}} >
                </ReactEcharts>
            </Card>
            <Card title="柱形图02">
                <ReactEcharts 
                    theme='theme'
                    option={this.get_option02()}
                    style={{height: 500}} >
                </ReactEcharts>
            </Card>
        </BarWrapper>
    }
}