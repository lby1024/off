import React from 'react'
import moment from 'moment'
import {UserWrapper} from './style'
import {Card, Form, Input, Icon, Button, message, Table, Modal, Radio, Select, DatePicker} from 'antd'
import { get_base_table } from "../../api/get_data"

export default class User extends React.Component {

    state = {
        list: null,       // 表格数据
        page: null,       // 当前页码
        page_size: 3,     // 一页有多少条数据
        total_count: null,// 总共有多少条数据
        life_state: ['咸鱼一条', '风华浪子', '北大才子', '百度FE', '创业者'],
        interest: ['游泳', '打篮球', '踢足球', '跑步', '爬山', '骑行', '桌球', '麦霸'],
    }
    componentWillMount() {
        this.get_data()
    }
    get_data = ()=>{
        get_base_table()
        .then(res=>{
            if (res.status===200) {
                let data = res.data.result
                let {list, page, page_size, total_count} = data
                list = this.clean_data(list)
                this.setState({list, page, page_size, total_count})
            }
            else message.error('返回数据不为200')
        })
        .catch(err=>{
            message.error('服务器没有返回任何数据')
        })
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

    // 点击按钮 ---> 添加员工
    add = ()=>{
        this.user_modal.show('add')
    }
    // 点击按钮 ---> 编辑员工
    editor = () => {
        let items = this.user_tab.state.items
        if (this.user_tab.state.items.length===0) message.error('你没有选中任何员工')
        else {
            this.user_modal.show('change', items[0])
        }
    }
    // 点击按钮 ---> 查看员工详情
    detail = () => {
        let items = this.user_tab.state.items
        if (this.user_tab.state.items.length===0) message.error('你没有选中任何员工')
        else {
            this.user_modal.show('detail', items[0])
        }
    }
    // 点击按钮 ---> 删除员工
    del = () => {
        let items = this.user_tab.state.items
        if (this.user_tab.state.items.length===0) message.error('你没有选中任何员工')
        else {
            message.success(`${items[0].username} ---> 已经被删除`)
            this.get_data()
        }
    }

    render () {
        let {list, page, page_size, total_count} = this.state
        let dom_btns = 
            <div>
                <Button type="primary" onClick={this.add}>创建员工</Button>
                <Button type="primary" onClick={this.editor}>编辑员工</Button>
                <Button type="primary" onClick={this.detail}>员工详情</Button>
                <Button type="danger" onClick={this.del} >删除员工</Button>
            </div>
        
        return (
            <UserWrapper>
                <Card>
                    <Logoin/>
                </Card>    
                <Card title={dom_btns}>
                    <UserTable 
                        c2f={self=>this.user_tab=self}
                        page={page}
                        size={page_size}
                        total={total_count}
                        list={list}>
                    </UserTable>
                </Card>
                <UserModal 
                    getData={this.get_data}
                    c2f={self=>this.user_modal=self} >
                </UserModal>
            </UserWrapper>
        )
    }
}

class UserModal extends React.Component {
    componentWillMount () {
        this.props.c2f(this)
    }
    state = {
        _status: null,      // 状态
        _sex: null,         // 性别
        _address: '',       // 地址
        _birthday: null,    // 生日
        name: '',           // 名字
        show: false,        // 弹框--> 显示 or 隐藏
        is_form: true,      // 弹框内容是否是 form 表单
        title: '',          // 弹框--> 标题
    }
    cancel = ()=>{
        this.setState({show: false})
    }
    ok = ()=>{
        this.setState({show: false})
        if (this.state.is_form){
            this.user_form.submit()
            this.props.getData()
        }
    }
    show = (type, item)=>{
        let show = true
        let title
        let is_form
        // 点击按钮 ---> 添加员工
        if (type==='add') {                 
            title = '添加员工'
            is_form = true
            this.setState({show, title, is_form})
        }
        // 点击按钮 ---> 员工详情
        else if (type==="detail") {
            title = "员工详情"
            is_form = false
            let name = item.username
            let _address = item.address
            let _sex = item.sex
            let _birthday = item.birthday
            let _status = item.state
            this.setState({show, title, is_form, name, _address, _sex, _birthday, _status})
        }
        // 点击按钮 ---> 编辑员工
        else {
            title = '编辑员工'
            is_form = true
            this.setState({show, title, is_form})
            // 当我点击编辑按钮时 ---> 弹框还没有加载 
            // 所以, 设置200ms, 延时 等待子组件将数据传到父组件
            setTimeout(
                ()=>this.user_form.change(type, item), 
                200
            )
            // this.user_form.change(item)
        }
    }

    render () {
        let {title, is_form, name, _address, _sex, _birthday, _status} = this.state
        let dom
        if (is_form) {
            dom = <UserForm c2f={self=>this.user_form=self}/> 
        }
        else{
            dom = 
                <div style={{paddingLeft: 30}}>
                    <p>姓名 : {name}</p>
                    <p>性别 : {_sex}</p>
                    <p>生日 : {_birthday}</p>
                    <p>地址 : {_address}</p>
                    <p>状态 : {_status}</p>
                </div>
        }

        return (
            <Modal
                onCancel={this.cancel}
                onOk={this.ok}
                visible={this.state.show}
                title={title}>
                {dom}
            </Modal>
        )
    }
}
// 添加用户的表单
class UserForm extends React.Component {

    state = {
        action_type: 'add',        // 添加员工 or 修改员工
        _status: null,             // 状态
        _sex: null,                // 性别
        _address: '请输入联系地址', // 地址
        _birthday: null,           // 生日
        name: ''                   // 名字
    }
    componentWillMount () {
        this.props.c2f(this)
    }
    // 修改表单的默认值
    change = (type, item) => {
        this.setState({
            action_type: type,
            name: item.username,
            _address: item.address,
            _sex: item.sex==='男'?'1':'2',
            _birthday: moment(item.birthday),
            _status: item.state
        })
    }
    // 点击ok, 提交表单
    submit = ()=>{
        let userInfo = this.props.form.getFieldsValue()
        if (this.state.action_type==="add") this.submit_add(userInfo)
        else this.submit_change(userInfo)
    }
    submit_add = (userInfo) => {
        this.props.form.validateFields((err)=>{      
            if (err) message.error('添加用户失败')
            else {
                message.success(`${userInfo.user_name} ---> 添加成功`)
                this.props.form.resetFields()
            }
        })
    }
    submit_change = (userInfo) => {
        this.props.form.validateFields((err)=>{      
            if (err) message.error('修改用户失败')
            else {
                message.success(`${userInfo.user_name} ---> 修改成功`)
                this.props.form.resetFields()
            }
        })
    }

    render () {
        let {name, _sex, _status, _address, _birthday} = this.state
        let {getFieldDecorator} = this.props.form
        let form_layout01 = {
            labelCol:{ sm:24, md:4 },   // label 在小屏, 中屏下的布局
            wrapperCol:{ sm:24, md:12 } // input 在小屏, 中屏下的布局
        }
        // 用户名======用户名======用户名======用户名======用户名======用户名======
        let user_options = {
            initialValue: name,
            rules: [
                {required: true, message: '用户名不能为空'},
                {min: 2, max:5,  message: '请输入5到10位用户名'},
            ]
        }
        let user_dom = 
            <Input 
                prefix={<Icon type='user' />}
                placeholder="请输入用户名" 
            />
        let user = getFieldDecorator('user_name', user_options)(user_dom)
        // 性别======性别======性别======性别======性别======性别======性别======性别======
        let sex_options = { initialValue: _sex }
        let sex_dom = 
            <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
            </Radio.Group>
        let sex = getFieldDecorator('sex', sex_options)(sex_dom)
        // 状态======状态======状态======状态======状态======状态======状态======状态======
        let m_state_options = { initialValue: _status }
        let m_state_dom = 
            <Select>
                <Select.Option value="1">咸鱼一条</Select.Option>
                <Select.Option value="2">风华浪子</Select.Option>
                <Select.Option value="3">北大才子一枚</Select.Option>
                <Select.Option value="4">百度FE</Select.Option>
                <Select.Option value="5">创业者</Select.Option>
            </Select>
        let m_state = getFieldDecorator('m_state', m_state_options)(m_state_dom) 
        // 生日======生日======生日======生日======生日======生日======生日======生日======生日======
        let birthday_options = {initialValue: _birthday}
        let birthday_dom = <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        let birthday = getFieldDecorator('birthday', birthday_options)(birthday_dom)
        // 联系地址======联系地址======联系地址======联系地址======联系地址======联系地址======联系地址======
        let address_options = {initialValue: _address}
        let text_layout = {minRows: 4, maxRows: 6}
        let address_dom = <Input.TextArea autosize={text_layout} />
        let address = getFieldDecorator('address', address_options)(address_dom) 

        return (
            <Form>
                <Form.Item
                    {...form_layout01}
                    label="用户名" >
                    {user}
                </Form.Item>
                <Form.Item
                    {...form_layout01}
                    label="性别" >
                    {sex}
                </Form.Item>
                <Form.Item
                    {...form_layout01}
                    label="状态" >
                    {m_state}
                </Form.Item>
                <Form.Item
                    {...form_layout01}
                    label="生日" >
                    {birthday}
                </Form.Item>
                <Form.Item
                    {...form_layout01}
                    label="联系地址" >
                    {address}
                </Form.Item>
            </Form>
        )
    }
}
UserForm = Form.create()(UserForm)
// 用户表格
class UserTable extends React.Component {
    // 表格模型
    tab_mode = [
        {
            title: 'id',
            key:'id',
            dataIndex:'id',
        },
        {
            title: '用户名',
            key: 'username',
            dataIndex: 'username',
        },
        {
            title: '年龄',
            key: 'year',
            dataIndex: 'year',
        },
        {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex',
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
        },
        {
            title: '爱好',
            key: 'interest',
            dataIndex: 'interest',
        },
        {
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday',
        },
        {
            title: '地址',
            key: 'address',
            dataIndex: 'address',
        },
        {
            title: '早起时间',
            key: 'time',
            dataIndex: 'time',
        }
    ]
    
    state = {
        radio_keys: [],   // 被选中的行的编号 ---> radio_keys = [1, 3, 4]时, 第1, 3, 4行将被选中
        items: []         // 被选中的行的数据 ---> items = [{...}, {...}, ... ]
    }

    componentWillMount() {
        this.props.c2f(this)
    }
    // 选中某一行时触发的fn
    radio_change = (keys, items) => {
        let radio_keys = keys
        this.setState({radio_keys, items})
    }
    // 点击翻页时触发的fn
    pagination_change = () => {
        
    }

    render () {
        let {list, size, total, page} = this.props
        // 单选表格options
        const radio_options = {                                 // 单选表格的设置   
            type: 'radio',                                // 单选框 or 复选框
            selectedRowKeys: this.state.radio_keys,       // radio_keys = [1, 3, 4]时, 第1, 3, 4行将被选中
            onChange: this.radio_change                   // ===== 点击选择框时触发的函数 ===>>
        }
        // 分页设置
        const pagination_options = {
            onChange: this.pagination_change,                           // ====== 点击分页按钮触发的方法 ======>
            current: page,                                              // 分页表格---> 显示第几页                          
            pageSize: size,                                             // 分页表格---> 一页显示多少条数据
            total: total,                                               // 分页表格---> 总共有多少条数据
            showTotal: ()=>`总共有${this.state.pagination_total}条数据`, // 页脚信息
            showQuickJumper: true                                       // 是否显示快速跳转框
        }
        return (
            <Table
                scroll={{x: 1200}}
                bordered                          // 显示边框
                columns={this.tab_mode}           // 表格模型
                dataSource={list}                 // 表格数据
                rowSelection={radio_options}      // 单选表格设置  
                pagination={pagination_options}>             
            </Table>
        )
    }
}
// 登录表单
class Logoin extends React.Component {
    
    render () {
        let {getFieldDecorator} = this.props.form
        // 用户名======用户名======用户名======用户名======用户名======用户名======
        let user_options = {
            rules: [
                {required: true, message: '用户名不能为空'},
                {min: 5, max:10,  message: '请输入5到10位用户名'},
                {pattern: /^\w+$/,  message: '用户名必须为字母或数字或下划线'}
            ]
        }
        let user_dom = 
            <Input 
                prefix={<Icon type='user' />}
                placeholder="请输入用户名" 
            />
        let user = getFieldDecorator('user_name', user_options)(user_dom)
        // 密码======密码======密码======密码======密码======密码======密码======密码======
        let password_options = {
            rules: [
                {required: true, message: '密码不能为空'},
                {min: 6, max:12,  message: '密码长度必须为6到12位'},
                {pattern: /^(\w|[!@#$%^&*()?])+$/, message: '密码只能由数字或字母或符号组成' }
            ]
        }
        let password_dom = 
            <Input
                prefix={<Icon type='key' />}
                placeholder="请输入密码"
                type='password'         // 设置后密码将会变成*****
            />
        let password = getFieldDecorator('password', password_options)(password_dom) 

        return (
            <Form layout="inline">
                <Form.Item>{user}</Form.Item>
                <Form.Item>{password}</Form.Item>
                <Form.Item><Button type="primary">登录</Button></Form.Item>
            </Form>
        )
    }
}
Logoin = Form.create()(Logoin)