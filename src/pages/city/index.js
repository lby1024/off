import React from 'react'
import { Card, Form, Button, Select, Radio, message, Table, Modal } from 'antd'
import { get_city_table } from '../../api/get_data.js'
import utils from '../../utils/utils.js'

import './index.less'

export default class City extends React.Component {
    state = {
        show: false
    }
    // 点击开通城市按钮, 弹出表单
    show = () => this.setState({show: true})
    cancel = () => {
        this.setState({show: false})
        message.info('本次开通已取消')
    }
    ok = () => {
        let {city, marketing, use} = this.cityForm.props.form.getFieldsValue()
        message.success(`开通城市 ---> ${city}---${marketing}---${use}`)
        this.setState({show: false})
    }
    render(){
        return(
            <div className="city">
                <Card>
                    <FilterForm />
                </Card>
                <Card title={<Button type="primary" onClick={this.show}>开通城市</Button>}>
                    <Table01 />
                </Card>
                <Modal
                    onCancel={this.cancel}
                    onOk={this.ok}
                    visible={this.state.show}
                    title="开通城市">
                    <CityForm 
                        wrappedComponentRef={(inst)=>this.cityForm=inst}>
                    </CityForm>
                </Modal>
            </div>
        )
    }
}
// 过滤数据的表单
class FilterForm extends React.Component {

    submit = ()=>{
        let info = this.props.form.getFieldsValue()
        message.success(`${info.city}---${info.mode}---${info.operation}---${info.join}`)
    }
    
    clear = ()=>{
        this.props.form.resetFields()
    }

    render () {
        let {getFieldDecorator} = this.props.form
        // 选择城市======选择城市======选择城市======选择城市======选择城市======选择城市======
        let city_options = { initialValue: '全部' }
        let city_dom = 
            <Select style={{width: 80}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="北京">北京</Select.Option>
                <Select.Option value="天津">天津</Select.Option>
                <Select.Option value="深圳">深圳</Select.Option>
            </Select>
        let city = getFieldDecorator('city', city_options)(city_dom)   
        // 用车模式======用车模式======用车模式======用车模式======用车模式======用车模式======
        let mode_options = { initialValue: '全部' }
        let mode_dom = 
            <Select style={{width: 130}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="指定停车点模式">指定停车点模式</Select.Option>
                <Select.Option value="禁停区模式">禁停区模式</Select.Option>
            </Select>
        let mode = getFieldDecorator('mode', mode_options)(mode_dom)   
        // 运营模式======运营模式======运营模式======运营模式======运营模式======运营模式======
        let operation_options = { initialValue: '全部' }
        let operation_dom = 
            <Select style={{width: 80}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="自营">自营</Select.Option>
                <Select.Option value="加盟">加盟</Select.Option>
            </Select>
        let operation = getFieldDecorator('operation', operation_options)(operation_dom)   
        // 加盟状态======加盟状态======加盟状态======加盟状态======加盟状态======加盟状态======
        let join_options = { initialValue: '全部' }
        let join_dom = 
            <Select style={{width: 80}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="已授权">已授权</Select.Option>
                <Select.Option value="未授权">未授权</Select.Option>
            </Select>
        let join = getFieldDecorator('join', join_options)(join_dom)   
        

        return (
            <Form layout='inline'>
                <Form.Item
                    label="城市" >
                    {city}
                </Form.Item>
                <Form.Item
                    label="用车模式" >
                    {mode}
                </Form.Item>
                <Form.Item
                    label="运营模式" >
                    {operation}
                </Form.Item>
                <Form.Item
                    label="加盟状态" >
                    {join}
                </Form.Item>
                <Form.Item>
                    <Button onClick={this.submit} type="primary" >查询</Button>
                    <Button onClick={this.clear} >重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm)

// 存放数据的表格
let table_model = [
    {
        title: '城市id',
        key: "id",
        dataIndex: 'id'
    },
    {
        title: '城市名称',
        key: "name",
        dataIndex: 'name'
    },
    {
        title: '用车模式',
        key: "mode",
        dataIndex: 'mode'
    },
    {
        title: '运营模式',
        key: "op_mode",
        dataIndex: 'op_mode'
    },
    {
        title: '授权加盟商',
        key: "franchise_name",
        dataIndex: 'franchise_name'
    },
    {
        title: '城市管理员',
        key: "city_admins",
        dataIndex: 'city_admins'
    },
    {
        title: '城市开通时间',
        key: "open_time",
        dataIndex: 'open_time'
    },
    {
        title: '操作时间',
        key: "update_time",
        dataIndex: 'update_time'
    },
    {
        title: '操作人',
        key: "sys_user_name",
        dataIndex: 'sys_user_name'
    },
]
class Table01 extends React.Component {
    state = {
        list: [],
        mode: ['指定停车点', '禁停区'],
        op_mode: ['自营', '加盟'],
        page_total: 20,
        page_size: 3,
        page_cur: 1
    }
    componentWillMount () {
        this.get_data()
    }
    get_data () {
        get_city_table()
        .then(res=>{
            let data = res.data.result
            let page_cur = data.page_count
            let page_total = data.total_count
            let page_size = data.page_size
            let list = data.item_list
            list = this.clean_data(list)
            console.log(list)
            this.setState({page_cur, page_total, page_size, list})
        })
    }
    clean_data (list) {
        return list.map(item=>{
            let city_admins = item.city_admins.map(user=>user.user_name)
            city_admins = city_admins.join(' & ')
            let key = item.id
            let mode = this.state.mode[item.mode-1]
            let op_mode = this.state.op_mode[item.op_mode-1]
            let update_time = utils.get_time(item.update_time)
            return {...item, city_admins, key, mode, op_mode, update_time}
        })
    }
    
    render () {
        const pagination_options = {
            onChange: ()=>this.get_data(),                                    // ====== 点击分页按钮触发的方法 ======>
            current: this.state.page_cur,                               // 分页表格---> 显示第几页                          
            pageSize: this.state.page_size,                             // 分页表格---> 一页显示多少条数据
            total: this.state.page_total,                               // 分页表格---> 总共有多少条数据
            showTotal: ()=>`总共有${this.state.page_total}条数据`,       // 页脚信息
            showQuickJumper: true                                       // 是否显示快速跳转框
        }
        return (
            <Table
                scroll={{x: 1200}}
                bordered                        // 显示边框
                columns={table_model}           // 表格模型
                dataSource={this.state.list}    // 表格数据
                pagination={pagination_options}>                   
            </Table> 
        )
    }
}

// 提交开通城市的表单
class CityForm extends React.Component {
    render () {
        let {getFieldDecorator} = this.props.form
        // 布局
        let form_layout = {
            labelCol:{ sm:5, md:5 },   // label 在小屏, 中屏下的布局
            wrapperCol:{ sm:19, md:19 } // input 在小屏, 中屏下的布局
        }
        // 选择城市=====选择城市=====选择城市=====选择城市=====选择城市=====选择城市=====
        let city_options = {initialValue: '北京'}
        let city_dom = 
            <Select style={{width: 100}}>
                <Select.Option value="北京">北京</Select.Option>
                <Select.Option value="广州">广州</Select.Option>
                <Select.Option value="上海">上海</Select.Option>
            </Select>
        let city = getFieldDecorator('city', city_options)(city_dom)
        // 选择运营模式======选择运营模式======选择运营模式======选择运营模式======选择运营模式======
        let marketing_options = {initialValue: '自营'}
        let marketing_dom = 
            <Radio.Group>
                <Radio value="自营">自营</Radio>
                <Radio value="加盟">加盟</Radio>
            </Radio.Group>
        let marketing = getFieldDecorator('marketing', marketing_options)(marketing_dom)
        // 选择使用模式======选择使用模式======选择使用模式======选择使用模式======选择使用模式======
        let use_options = {initialValue: '指定停车点'}
        let use_dom = 
            <Radio.Group>
                <Radio value="指定停车点">指定停车点</Radio>
                <Radio value="设置禁停区">设置禁停区</Radio>
            </Radio.Group>
        let use = getFieldDecorator('use', use_options)(use_dom)
        return (
            <Form>
                <Form.Item
                    {...form_layout} 
                    label="选择城市">
                    {city}
                </Form.Item>
                <Form.Item
                    {...form_layout} 
                    label="运营模式">
                    {marketing}
                </Form.Item>
                <Form.Item
                    {...form_layout} 
                    label="使用模式">
                    {use}
                </Form.Item>
            </Form>
        )
    }
}
CityForm = Form.create({})(CityForm)