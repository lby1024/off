import React from 'react'
import {Card} from 'antd'
import {BarWrapper} from './style'
// echarts======echarts======echarts======echarts======echarts======
import ReactEcharts from 'echarts-for-react';
// 引入柱状图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

export default class Bar extends React.Component {

    get_option01 = () => {
        return {
            title: {text: '用户骑行订单'},
            tooltip: {trigger: 'axis'},
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {type: 'value'},
            series:[
                {
                    name: '订单量',
                    type: 'line',
                    itemStyle: {color: '#fce72a'},
                    data: [1000, 1800, 1200, 2100, 900, 1500, 300]
                }
            ]
        }
    }
    get_option02 = () => {
        return {
            title: {text: '用户骑行订单'},
            tooltip: {trigger: 'axis'},
            legend: {data: ['offo', 'mobike']},
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {type: 'value'},
            series:[
                {
                    name: 'offo',
                    type: 'line',
                    itemStyle: {color: '#fce72a'},
                    data: [1300, 1500, 2800, 2100, 900, 1500, 300]
                },
                {
                    name: 'mobike',
                    type: 'line',
                    data: [1800, 1300, 1500, 2600, 600, 2300, 1200]
                }
            ]
        }
    }
    get_option03 = () => {
        return {
            title: {text: '用户骑行订单'},
            tooltip: {trigger: 'axis'},
            legend: {data: ['offo', 'mobike', '小蓝']},
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {type: 'value'},
            series:[
                {
                    name: 'offo',
                    type: 'line',
                    itemStyle: {color: '#fce72a'},
                    areaStyle: {},
                    data: [300, 900, 1200, 2100, 2400, 1200, 600]
                },
                {
                    name: 'mobike',
                    type: 'line',
                    areaStyle: {},
                    data: [100, 500, 900, 1200, 1900, 900, 300]
                },
                {
                    name: '小蓝',
                    type: 'line',
                    itemStyle: {color: 'skyblue'},
                    areaStyle: {},
                    data: [100, 300, 700, 1000, 1500, 600, 100]
                }
            ]
        }
    }

    render () {
        return <BarWrapper>
            <Card title="线形01">
                <ReactEcharts 
                    option={this.get_option01()}
                    style={{height: 500}} >
                </ReactEcharts>
            </Card>
            <Card title="线形02">
                <ReactEcharts 
                    option={this.get_option02()}
                    style={{height: 500}} >
                </ReactEcharts>
            </Card>
            <Card title="线形03">
                <ReactEcharts 
                    option={this.get_option03()}
                    style={{height: 500}} >
                </ReactEcharts>
            </Card>
        </BarWrapper>
    }
}