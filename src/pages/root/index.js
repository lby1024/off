import React from 'react'
import {RootWrapper} from './style'
import {get_users} from '../../api/get_data'
import {table_users} from './tables'
import menuList from '../../data/nav_data'
import {Transfer, Tree, Card, Button, Modal, Form, Input, Icon, Select, message, Table} from 'antd'

export default class Root extends React.Component {
    state = {
        show01: false,    // 显示弹框 ---> 创建用户
        show02: false,    // 显示弹框 ---> 设置权限  
        show03: false,    // 显示弹框 ---> 设置授权  
        users: null,      // 管理人员名单
        cur: null,        // 被选中的人员
    }

    componentDidMount () {
        this._get_users()
    }

    // 获取管理员名单
    _get_users () {
        get_users().then(res=>{
            if (res.status===200) {
                let users = res.data.data.users
                this.setState({users})
            }
        })
    }
    // 显示创建用户表单=========显示创建用户表单=========显示创建用户表单=========显示创建用户表单=========
    // ---> 创建用户
    show01 = () => {
        this.setState({show01: true})
    }
    // ---> 用户授权
    show02 = () => {
        let cur = this.user_table.state.selected_rows[0]
        if (cur) {
            this.setState({show02: true, cur})
        } 
        else {
            Modal.warning({
                title: 'warning',
                content: '您没有选中任何管理员',
            })
        }
    }
    // ---> 授权管理
    show03 = () => {
        this.setState({show03: true})
    }
    
    // 点击取消======点击取消======点击取消======点击取消======点击取消======点击取消======
    // ---> 创建用户
    cancel01 = () => {
        this.setState({show01: false})
    }
    // ---> 用户授权
    cancel02 = () => {
        this.tree.init()            // 勾选树回到默认状态
        this.user_table.init()      // 表格不再选中任何一行
        this.setState({show02: false})
    }
    // ---> 授权管理
    cancel03 = () => {
        this.transfer.init()
        this.setState({show03: false})
    }
    // 点击ok======点击ok======点击ok======点击ok======点击ok======点击ok======点击ok======
    // ---> 创建用户
    ok01 = () => {
        this.new_user.submit()              // 获取填写的表单数据
        this._get_users()                   // 重新获取用户表单
        this.setState({show01: false})
    }
    // ---> 用户授权
    ok02 = () => {
        let data = {                        // 获取修改后的数据
            user_info: this.state.cur,
            selected: this.tree.state.checkedKeys
        }
        console.log('用户授权 -> 点击ok -> 获取到的数据', data)
        this.tree.init()            // 勾选树回到默认状态
        this.user_table.init()      // 表格不再选中任何一行
        this._get_users()
        this.setState({show02: false})
    }
    // ---> 授权管理
    ok03 = () => {
        this.transfer.init()
        this._get_users()
        this.setState({show03: false})
    }

    render () {
        let {show01, show02, show03, users, cur} = this.state
        return <RootWrapper>
            {/* 按钮 */}
            <Card >
                <Button type="primary" onClick={this.show01}>创建角色</Button>
                <Button type="primary" onClick={this.show02}>设置权限</Button>
                <Button type="primary" onClick={this.show03}>权限管理</Button>
            </Card>
            {/* 表格 */}
            <Card>
                <UserTable dataSource={users} c2f={self=>this.user_table=self} />
            </Card>
            {/* 弹框 ---> 创建用户 */}
            <Modal
                onCancel={this.cancel01}
                onOk={this.ok01}
                visible={show01}
                title="创建用户" >
                <NewUser c2f={self=>this.new_user=self} />
            </Modal>
            {/* 弹框 ---> 用户授权 */}
            <Modal
                onCancel={this.cancel02}
                onOk={this.ok02}
                visible={show02}
                title="用户授权" >
                <Input 
                    disabled={true}
                    placeholder={cur&&cur.user_name} 
                    prefix={<Icon type='user' />} >
                </Input>
                <RootTree c2f={self=>this.tree=self} />
            </Modal>
            {/* 弹框 ---> 授权管理 */}
            <Modal
                onCancel={this.cancel03}
                onOk={this.ok03}
                visible={show03}
                title="授权管理" >
                <Transferrr 
                    c2f={self=>this.transfer=self}
                    data={users}>
                </Transferrr>
            </Modal>
        </RootWrapper>
    }
}

// form ---> 用户名, 授权状态
class NewUser extends React.Component {

    componentWillMount () {
        this.props.c2f(this)
    }
    // 获取填写的表单数据
    submit () {
        let userInfo = this.props.form.getFieldsValue()     // 获取表单信息
        this.props.form.validateFields((err)=>{      
            if(err){                                        // 如果未能通过表单验证
                message.error('失败 -> 创建用户')
            }
            else {                                          // 如果通过表单验证                
                console.log('打印填写的表单数据', JSON.stringify(userInfo))       // 打印获取到的数据
                message.success(`恭喜${userInfo.user_name} 创建成功`)
                this.props.form.resetFields()               // 清空重置表格
            }
        })
    }

    render () {
        let {getFieldDecorator} = this.props.form
        // css布局
        let form_layout01 = {
            labelCol:{ sm:24, md:4 },   // label 在小屏, 中屏下的布局
            wrapperCol:{ sm:24, md:12 } // input 在小屏, 中屏下的布局
        }
        // 用户名=========用户名=========用户名=========用户名=========用户名=========用户名=========
        let user_options = {
            rules: [
                {required: true, message: '用户名不能为空'},
                {min: 2, max:5,  message: '请输入2到5位用户名'},
                // {pattern: /^\w+$/,  message: '用户名必须为字母或数字或下划线'}
            ]
        }
        let user_dom = 
            <Input 
                prefix={<Icon type='user' />}
                placeholder="请输入用户名" >
            </Input>
        let user = getFieldDecorator('user_name', user_options)(user_dom)
        // 状态=========状态=========状态=========状态=========状态=========状态=========状态=========
        let m_state_options = { initialValue: '1' }
        let m_state_dom = 
            <Select>
                <Select.Option value="1">开启</Select.Option>
                <Select.Option value="2">关闭</Select.Option>
            </Select>
        let m_state = getFieldDecorator('m_state', m_state_options)(m_state_dom) 

        return (
            <Form>
                <Form.Item label='用户名' {...form_layout01} >
                    {user}
                </Form.Item>
                <Form.Item label='状态' {...form_layout01} >
                    {m_state}
                </Form.Item>
            </Form>
        )
    }
}
NewUser = Form.create()(NewUser)
// form ---> 用户授权
class RootTree extends React.Component {

    componentWillMount() {
        this.props.c2f(this)    // <<=========@ : 将自己传给父@@@
    }

    state = {
        checkedKeys: [ '/ui/buttons', '/ui/modals', '/ui/loadings', '/ui/notification', '/ui/messages', '/ui/tabs', '/ui/gallery', '/ui/carousel']
    }

    // 回到最初的选中项目
    init = () => {
        let checkedKeys = [ '/ui/buttons', '/ui/modals', '/ui/loadings', '/ui/notification', '/ui/messages', '/ui/tabs', '/ui/gallery', '/ui/carousel']
        this.setState({checkedKeys})
    }

    onCheck = keys => {
        this.setState({checkedKeys: keys})
    }

    render_tree (list) {
        return list.map(item=>{
            if (item.children) {
                return <Tree.TreeNode key={item.key} title={item.title} >
                    {this.render_tree(item.children)}
                </Tree.TreeNode>
            }
            return <Tree.TreeNode key={item.key} title={item.title} />
        })
    }

    render () {
        let {checkedKeys} = this.state
        return (
            <Tree
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
                defaultExpandAll 
                checkable >
                {this.render_tree(menuList)}
            </Tree>
        )
    }
}

// 
class Transferrr extends React.Component {

    state = {
        targetKeys: []
    }

    componentWillMount() {
        this.props.c2f(this)    // <<=========@ : 将自己传给父@@@
    }

    // input过滤 ---> 按下回车键触发 ---> 有几个item函数就执行几次 ---> this.state.data = [item, item, ... ]
    filterOption = (value, item) => {
        console.log(value, item)
        return item.user_name.indexOf(value) > -1
    }
    // 点击中间的箭头时
    onChange = targetKeys => {
        console.log(targetKeys)
        this.setState({targetKeys})
    }
    // 回到最初状态
    init () {
        this.setState({targetKeys: []})
    }

    render () {
        let {data} = this.props
        let {targetKeys} = this.state
        data = data.map(item=>({...item, key: item.user_id}))   // 给item添加一个key属性 ---> item.key
        console.log(data)
        return (
            <Transfer 
                dataSource={data}
                render={item=>item.user_name}
                titles={['待选用户', '已选用户']}
                searchPlaceholder='输入用户名'
                filterOption={this.filterOption}
                targetKeys={targetKeys}
                onChange={this.onChange}
                listStyle={{width: 200,height: 400}}
                showSearch >
            </Transfer>
        )
    }
}

// table ---> 人员表格
class UserTable extends React.Component {

    state = {
        radio_keys: [],             // 被选中的某一行的行数
        selected_rows: []           // 被选中的某一行的数据
    }
    componentWillMount () {
        this.props.c2f(this)        // 让父组件调用自己
    }

    // 清零 ---> 不选中任何数据
    init () {
        this.setState({radio_keys: [], selected_rows: []})
    }

    // 选择某一行数据时触发
    radio_change = (keys, items) => {
        let selected_rows = items
        let radio_keys = keys
        console.log('选择某一行数据时', keys, items)
        this.setState({selected_rows, radio_keys})
    }

    render () {
        let {dataSource} = this.props
        // 给每一个item添加一个key --->item.key
        if (dataSource) {
            dataSource = dataSource.map(item=>({
                ...item,
                key: item.user_id
            }))
        }
        // 单选表格的设置  
        const radio_options = {                            
            type: 'radio',                                // 单选框 or 复选框
            selectedRowKeys: this.state.radio_keys,       // teb03_cur_key=[1, 3, 4]时, 第1, 3, 4行将被选中
            onChange: this.radio_change                   // ===== 点击选择框时触发的函数 ===>>
        }
        return (
            <Table 
                scroll={{x: 1200}}
                dataSource={dataSource}
                pagination={false}
                rowSelection={radio_options}
                columns={table_users} >
            </Table>
        )
    }
}
UserTable = Form.create()(UserTable)