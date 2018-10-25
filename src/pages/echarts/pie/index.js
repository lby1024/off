import React from 'react'
import {Card} from 'antd'
import {BarWrapper} from './style'
// echarts======echarts======echarts======echarts======echarts======
import ReactEcharts from 'echarts-for-react';
// 引入柱状图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

export default class Bar extends React.Component {


    get_option01 = () => {
        return {
            title: {text: '用户骑行订单', x: 'center'},
            legend: {
                data: ['周一','周二','周三','周四','周五','周六','周日'],
                orient: 'vertical',
                right: 20,
                top: 20
            },
            tooltip: {
                triggle: 'item',
                formatter : "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '55%',
                    // hover 时添加阴影效果
                    emphasis: {
                        itemStyle: {
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 10
                        }
                    },
                    data: [
                        {value: 1000, name: '周一'},
                        {value: 1000, name: '周二'},
                        {value: 2000, name: '周三'},
                        {value: 1500, name: '周四'},
                        {value: 3000, name: '周五'},
                        {value: 2000, name: '周六'},
                        {value: 1200, name: '周日'},
                    ]
                }
            ]
        }
    }
    get_option02 = () => {
        return {
            title: {text: '用户骑行订单', x: 'center'},
            legend: {
                data: ['周一','周二','周三','周四','周五','周六','周日'],
                orient: 'vertical',
                right: 20,
                top: 20
            },
            tooltip: {
                triggle: 'item',
                formatter : "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['30%', '60%'],
                    // hover 时添加阴影效果
                    emphasis: {
                        itemStyle: {
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 10
                        }
                    },
                    data: [
                        {value: 1000, name: '周一'},
                        {value: 1000, name: '周二'},
                        {value: 2000, name: '周三'},
                        {value: 1500, name: '周四'},
                        {value: 3000, name: '周五'},
                        {value: 2000, name: '周六'},
                        {value: 1200, name: '周日'},
                    ]
                }
            ]
        }
    }
    get_option03 = () => {
        return {
            title: {text: '用户骑行订单', x: 'center'},
            legend: {
                data: ['周一','周二','周三','周四','周五','周六','周日'],
                orient: 'vertical',
                right: 20,
                top: 20
            },
            tooltip: {
                triggle: 'item',
                formatter : "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    roseType: 'radius',
                    // hover 时添加阴影效果
                    emphasis: {
                        itemStyle: {
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 10
                        }
                    },
                    data: [
                        {value: 1000, name: '周一'},
                        {value: 1000, name: '周二'},
                        {value: 2000, name: '周三'},
                        {value: 1500, name: '周四'},
                        {value: 3000, name: '周五'},
                        {value: 2000, name: '周六'},
                        {value: 1200, name: '周日'},
                    ].sort((a, b)=>a.value-b.value)
                }
            ]
        }
    }


    render () {
        return <BarWrapper>
            <Card title="饼状图01">
                <ReactEcharts 
                    option={this.get_option01()}
                    style={{height: 500}} >
                </ReactEcharts>
            </Card>
            <Card title="饼状图02">
                <ReactEcharts 
                    option={this.get_option02()}
                    style={{height: 500}} >
                </ReactEcharts>
            </Card>
            <Card title="玫瑰图">
                <ReactEcharts 
                    option={this.get_option03()}
                    style={{height: 500}} >
                </ReactEcharts>
            </Card>
        </BarWrapper>
    }
}