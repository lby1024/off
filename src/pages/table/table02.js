import React from 'react'
import {Card, Table, message, Badge} from 'antd'

import { get_base_table } from '../../api/get_data.js'
import model from './table_model.js'

import './index.less'

export default class Tab02 extends React.Component {

    state = {
        life_state: ['咸鱼一条', '风华浪子', '北大才子', '百度FE', '创业者'],
        interest: ['游泳', '打篮球', '踢足球', '跑步', '爬山', '骑行', '桌球', '麦霸'],
        tab_data: null,
        tab_model02: model.tab02,
        tab_model03: model.tab03,
        tab_model04: model.tab04,
        tab_model05: model.tab05
    }

    componentWillMount () {
        this.get_data()
    }

    // 获取数据======获取数据======获取数据======获取数据======获取数据======获取数据======
    get_data () {
        get_base_table()
        .then(res=>{
            let tab_data = this.clean_data(res.data.result.list)    // 表格数据
            this.setState({tab_data})
        })
        .catch(err=>message.error('获取数据失败'))
    }
    clean_data (list) {     // 对请求来的数据进行加工 ---> sex: 1 => sex: '男'
        let man = <Badge status="success" text="男" />
        let woman = <Badge status="error" text="女" />
        return list.map(item=>{
            let key = item.id
            let sex = item.sex===1?man:woman
            let state = this.state.life_state[item.state-1]
            let interest = this.state.interest[item.interest-1]
            let isMarried = item.isMarried?'是': '否'
            return {...item, key, sex, state, interest, isMarried}
        })
    }
    // 和排序列表相关的方法======和排序列表相关的方法======和排序列表相关的方法======和排序列表相关的方法======
    onChange = (pagination, filters, sorter) => {   // 表格发生变化---> 触发onChange方法
        console.log(sorter.order)
        if (sorter.order==='descend') this.sort_descend()
        else if (sorter.order==='ascend') this.sort_ascend()
    }
    sort_descend () {            // 降序 : 大 --> 小
        let list = this.state.tab_data
        list.sort((a, b)=>b.year-a.year)
        this.setState({tab_data: list})
    }
    sort_ascend () {            // 升序 : 小 ---> 大
        let list = this.state.tab_data
        list.sort((a, b)=>a.year-b.year)
        this.setState({tab_data: list})
    }
    
    // 渲染dom======渲染dom======渲染dom======渲染dom======渲染dom======渲染dom===
    render(){
        return (
            <div className="table">
                <Card title="竖向滚动 -- 表格">
                    <Table
                        scroll={{y: 210}}                   // 当表格高度>210 时, 出现竖向滚动条
                        columns={this.state.tab_model02}    // 表格模型
                        dataSource={this.state.tab_data}    // 表格数据
                        pagination={false} >                  
                    </Table>
                </Card>
                <Card title="横向滚动 -- 表格">
                    <Table
                        scroll={{x: 1100}}                   // 当表格宽度>1000 时, 出现横向滚动条
                        columns={this.state.tab_model03}     // 表格模型
                        dataSource={this.state.tab_data}     // 表格数据
                        pagination={false} >                  
                    </Table>
                </Card>
                <Card title="排序 -- 表格">
                    <Table
                        columns={this.state.tab_model04}     // 表格模型
                        dataSource={this.state.tab_data}     // 表格数据
                        onChange={this.onChange}             // 监听表格上的事件: 选择页码, 过滤, 排序
                        pagination={false} >                  
                    </Table>
                </Card>
            </div>
        )
    }
}