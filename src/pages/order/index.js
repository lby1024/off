import React from 'react'
import { get_orders } from '../../api/get_data.js'
import fns from '../../utils/utils.js'
import { Card, Form, Select, DatePicker, Button, message, Table } from 'antd'

export default class Oders extends React.Component {
    
    // 点击按钮 ---> 结束订单
    over = () => {
        let order_sn = this.table_order.state.order_sn
        if (order_sn) message.success(`结束订单${order_sn}`)
        else message.error('你没有选中订单')
    }
    // 点击按钮 ---查看---> 订单详情
    detail = () => {
        let order_sn = this.table_order.state.order_sn
        let cur_item = this.table_order.state.cur_item
        if (cur_item) {
            window.open(`/#/detail/${order_sn}`)
            localStorage.info = JSON.stringify(cur_item)
        }
        else message.error('你还没有选中订单')
    }

    render(){
        let dom_btns = 
            <div>
                <Button type="primary" onClick={this.detail}>订单详情</Button>
                <Button type="primary" onClick={this.over}>订单结束</Button>
            </div>

        return(
            <div className="city">
                <Card>
                    <Filter/>
                </Card>
                <Card
                    title={dom_btns}>
                    <TableOder wrappedComponentRef={inst=>this.table_order=inst} />
                </Card>
            </div>
        )
    }
}

class Filter extends React.Component {
    query = () => {
        let info = this.props.form.getFieldsValue()
        message.success(`查询--->${info.city}---${info.time_start}---${info.time_end}---${info.order_state}}`)
    }
    clean = () => {
        this.props.form.resetFields()
    }
    render () {
        let {getFieldDecorator} = this.props.form
        // 选择城市======选择城市======选择城市======选择城市======选择城市======选择城市======
        let city_options = { initialValue: '全部' }
        let city_dom = 
            <Select style={{width: 200}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="北京">北京</Select.Option>
                <Select.Option value="天津">天津</Select.Option>
                <Select.Option value="深圳">深圳</Select.Option>
            </Select>
        let city = getFieldDecorator('city', city_options)(city_dom)   
        // 开始时间======开始时间======开始时间======开始时间======开始时间======开始时间======开始时间======
        let time_start_options = {}
        let time_start_dom = <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="选择开始时间" />
        let time_start = getFieldDecorator('time_start', time_start_options)(time_start_dom)
        // 结束时间======结束时间======结束时间======结束时间======结束时间======结束时间======结束时间======
        let time_end_options = {}
        let time_end_dom = <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="选择结束时间" />
        let time_end = getFieldDecorator('time_end', time_end_options)(time_end_dom)
        // 订单状态======订单状态======订单状态======订单状态======订单状态======订单状态======订单状态======
        let order_state_options = { initialValue: '全部' }
        let order_state_dom = 
            <Select style={{width: 150}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="进行中">进行中</Select.Option>
                <Select.Option value="进行中(临时锁车)">进行中(临时锁车)</Select.Option>
                <Select.Option value="行程结束">行程结束</Select.Option>
            </Select>
        let order_state = getFieldDecorator('order_state', order_state_options)(order_state_dom) 

        return (
            <Form layout="inline">
                <Form.Item label="城市">{city}</Form.Item>
                <Form.Item >{time_start}</Form.Item>
                <Form.Item >{time_end}</Form.Item>
                <Form.Item label="订单状态">{order_state}</Form.Item>
                <Form.Item >
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button onClick={this.clean}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
Filter = Form.create()(Filter)
export const FilterForm = Filter


class TableOder extends React.Component {
    state = {
        list: null,         // 订单数据
        cur_item: null,     // 被选中的那行数据
        order_sn: null,     // 被选中的订单的编号
        page_total: 20,     // 总共有多少条数据
        page_size: 3,       // 一页有几行数据
        keys: [],           // 当前被选中的行
        page_cur: 1         // 当前页码
    }
    componentWillMount () {
        this.get_data()
    }
    get_data () {
        get_orders()
        .then(res=>{
            if (res.status===200) {
                let data = res.data.result
                let list = this.clean_data(data.item_list)
                let page_total = data.total_count
                let page_size = data.page_size
                let page_cur = data.page_cur
                this.setState({list, page_total, page_size, page_cur})
            }
            else {
                message.error('服务器返回了错误数据')
            }
        })
        .catch(err=>console.log(err))
    }
    clean_data (list) {
        return list.map(item=>{
            let key = item.id
            let pay = '10.00'
            let total_time = fns.get_h_m_s(item.total_time)
            let distance = item.distance/1000 + 'km'
            let status = item.status===1?'进行中':'行程结束'
            return {...item, pay, key, total_time, distance, status} 
        })
    }
    radio_change = (keys, items) => {
        let order_sn = items[0].order_sn
        let cur_item = items[0]
        this.setState({keys, order_sn, cur_item})
    }
    pagination_change = () => {
        this.get_data()
    }

    render () {
        let model = [
            {
                title: '订单编号',
                key:'order_sn',
                dataIndex:'order_sn',
            },
            {
                title: '车辆编号',
                key:'bike_sn',
                dataIndex:'bike_sn',
            },
            {
                title: '用户名',
                key:'user_name',
                dataIndex:'user_name',
            },
            {
                title: '手机号码',
                key:'mobile',
                dataIndex:'mobile',
            },
            {
                title: '里程',
                key:'distance',
                dataIndex:'distance',
            },
            {
                title: '行程时长',
                key:'total_time',
                dataIndex:'total_time',
            },
            {
                title: '状态',
                key:'status',
                dataIndex:'status',
            },
            {
                title: '开始时间',
                key:'start_time',
                dataIndex:'start_time',
            },
            {
                title: '结束时间',
                key:'end_time',
                dataIndex:'end_time',
            },
            {
                title: '订单金额',
                key:'pay',
                dataIndex:'pay',
            },
            {
                title: '实付金额',
                key:'user_pay',
                dataIndex:'user_pay',
            },
        ]

        const radio_options = {                           // 单选表格的设置   
            type: 'radio',                                // 单选框 or 复选框
            selectedRowKeys: this.state.keys,             // teb03_cur_key=[1, 3, 4]时, 第1, 3, 4行将被选中
            onChange: this.radio_change                   // ===== 点击选择框时触发的函数 ===>>
        }
        const pagination_options = {
            onChange: this.pagination_change,                           // ====== 点击分页按钮触发的方法 ======>
            current: this.state.page_cur,                               // 分页表格---> 显示第几页                          
            pageSize: this.state.page_size,                             // 分页表格---> 一页显示多少条数据
            total: this.state.page_total,                               // 分页表格---> 总共有多少条数据
            showTotal: ()=>`总共有${this.state.page_total}条数据`,       // 页脚信息
            showQuickJumper: true                                       // 是否显示快速跳转框
        }

        return(
            <Table
                scroll={{x: 1200}}
                bordered                          // 显示边框
                columns={model}                   // 表格模型
                dataSource={this.state.list}      // 表格数据
                rowSelection={radio_options}      // 单选表格设置  
                pagination={pagination_options}>           
            </Table>
        )
    }
}
TableOder = Form.create()(TableOder)
