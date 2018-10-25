import React from 'react'
import {Card, Table, message, Modal, Button} from 'antd'

import { get_base_table } from '../../api/get_data.js'
import model from './table_model.js'

import './index.less'

export default class Tab01 extends React.Component {
    state = {
        life_state: ['咸鱼一条', '风华浪子', '北大才子', '百度FE', '创业者'],
        interest: ['游泳', '打篮球', '踢足球', '跑步', '爬山', '骑行', '桌球', '麦霸'],
        tab_data: null,         // 表格的数据             
        checkbox_keys: null,    // 复选表格---> 被选中的行---> 如果选中了 1, 3, 行 ---> checkbox_keys = [1, 3]
        radio_keys: null,       // 单选表格---> 被选中的行---> 如果选中了第二行 ---> radio_keys = [2]
        pagination_cur: 1,      // 分页表格---> 显示第几页
        pagination_size: 3,     // 分页表格---> 一页显示多少条数据
        pagination_total: 6     // 分页表格---> 总共有多少条数据
    }
 
    componentWillMount () {
        this.get_data()
    }

    // 获取数据======获取数据======获取数据======获取数据======获取数据======获取数据======获取数据======
    get_data () {
        get_base_table()
        .then(res=>{
            let tab_data = this.clean_data(res.data.result.list)    // 表格数据
            let pagination_total = 10                   // 中共有多少条数据
            this.setState({tab_data, pagination_total})
        })
        .catch(err=>message.error('获取数据失败'))
    }
    clean_data (list) {     // 对请求来的数据进行加工 ---> sex: 1 => sex: '男'
        return list.map(item=>{
            let key = item.id
            let sex = item.sex===1?'男':'女'
            let state = this.state.life_state[item.state-1]
            let interest = this.state.interest[item.interest-1]
            let isMarried = item.isMarried?'是': '否'
            return {...item, key, sex, state, interest, isMarried}
        })
    }
    // 和复选表格有关的方法======和复选表格有关的方法======和复选表格有关的方法======和复选表格有关的方法======
    checkbox_change = (keys, items) => {        // 点击复选框触发的方法
        let checkbox_keys = keys
        this.setState({checkbox_keys})
    }
    checkbox_del = () => {                      // 点击删除按钮触发的方法
        Modal.confirm({
            title: '你将要删除以下行数的数据',
            content: this.state.checkbox_keys.join('---')
        })
    }
    // 和单选表格有关的方法======和单选表格有关的方法======和单选表格有关的方法======和单选表格有关的方法======
    radio_change = (keys, items) => {       // 点击单选框触发的方法
        let radio_keys = keys
        this.setState({radio_keys})
    }
    radio_del = () => {                     // 点击删除按钮触发的方法
        Modal.confirm({
            title: '你将要删除以下行数的数据',
            content: this.state.radio_keys.join('---')
        })
    }
    // 和分页表格有关的方法======和分页表格有关的方法======和分页表格有关的方法======和分页表格有关的方法======
    pagination_change = cur => {
        let pagination_cur = cur
        this.setState({pagination_cur})
    }

    // 渲染dom======渲染dom======渲染dom======渲染dom======渲染dom======渲染dom===
    render(){

        const checkbox_options = {                           // 复选表格的设置   
            type: 'checkbox',                                // 单选框 or 复选框
            selectedRowKeys: this.state.checkbox_keys,       // teb03_cur_key=[1, 3, 4]时, 第1, 3, 4行将被选中
            onChange: this.checkbox_change                   // 点击选择框时触发的函数
        }
        const radio_options = {                           // 单选表格的设置   
            type: 'radio',                                // 单选框 or 复选框
            selectedRowKeys: this.state.radio_keys,       // teb03_cur_key=[1, 3, 4]时, 第1, 3, 4行将被选中
            onChange: this.radio_change                   // 点击选择框时触发的函数
        }
        const pagination_options = {
            onChange: this.pagination_change,                           // ------ 点击分页按钮触发的方法 ------>
            current: this.state.pagination_cur,                         // 分页表格---> 显示第几页                          
            pageSize: this.state.pagination_size,                       // 分页表格---> 一页显示多少条数据
            total: this.state.pagination_total,                         // 分页表格---> 总共有多少条数据
            showTotal: ()=>`总共有${this.state.pagination_total}条数据`, // 页脚信息
            showQuickJumper: true                                       // 是否显示快速跳转框
        }

        return(
            <div className="table">
                <Card title="基础表格">
                    <Table
                        bordered                          // 显示边框
                        columns={model.tab01}             // 表格模型
                        dataSource={this.state.tab_data}  // 表格数据
                        pagination={false}>             
                    </Table>              
                </Card>
                <Card title="多选 - 表格">
                    <Button 
                        type="primary" 
                        onClick={this.checkbox_del}>
                        删除选中项
                    </Button>
                    <Table
                        bordered                          // 显示边框
                        columns={model.tab01}             // 表格模型
                        dataSource={this.state.tab_data}  // 表格数据
                        rowSelection={checkbox_options}   // 复选表格设置  
                        pagination={false}>             
                    </Table>              
                </Card>
                <Card title="单选 - 表格">
                    <Button 
                        type="primary" 
                        onClick={this.radio_del}>
                        删除选中项
                    </Button>
                    <Table
                        bordered                          // 显示边框
                        columns={model.tab01}             // 表格模型
                        dataSource={this.state.tab_data}  // 表格数据
                        rowSelection={radio_options}      // 单选表格设置  
                        pagination={false}>             
                    </Table>              
                </Card>
                <Card title="分页 - 表格">
                    <Table
                        pagination={pagination_options}     // 分页器设置
                        columns={model.tab01}               // 表格模型
                        dataSource={this.state.tab_data}    // 表格数据
                        bordered >
                    </Table>              
                </Card>
            </div>
        )
    }
}