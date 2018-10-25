import React from 'react'
import {Card, Input, Form, Button, Checkbox, message, Icon} from 'antd'

import './form.less'

class MLogin extends React.Component {   

    submit = ()=>{
        let userInfo = this.props.form.getFieldsValue()     // 获取表单信息
        this.props.form.validateFields((err)=>{      
            if(err){                                        // 如果未能通过表单验证
                message.error('登录失败')
            }
            else {                                          // 如果通过表单验证                
                message.success(`恭喜${userInfo.user_name} 登录成功，当前密码为：${userInfo.password}`)
            }
        })
    }

    render(){
        let {getFieldDecorator} = this.props.form
        // 用户名设置
        let user_name_options = {
            rules: [
                {required: true, message: '用户名不能为空'},
                {min: 5, max:10,  message: '请输入5到10位用户名'},
                {pattern: /^\w+$/,  message: '用户名必须为字母或数字或下划线'}
            ]
        }
        let user_input = 
            <Input 
                prefix={<Icon type='user' />}
                placeholder="请输入用户名" 
            />
        let user_name = getFieldDecorator('user_name',user_name_options)(user_input)
        // 密码设置
        let password_options = {
            rules: [
                {require: true, message: '密码不能为空'},
                {min: 6, max:12,  message: '密码长度必须为6到12位'},
                {pattern: /^(\w|[!@#$%^&*()?])+$/, message: '密码只能由数字或字母或符号组成' }
            ]
        }
        let password_input = 
            <Input
                prefix={<Icon type='key' />}
                placeholder="请输入密码"
                type='password'
            />
        let password = getFieldDecorator('password', password_options)(password_input)
        // checkbox_记住密码_的设置
        let remember_options = {
            valuePropName:'checked',
            initialValue: true
        }
        let remember = getFieldDecorator('remember',remember_options)(<Checkbox >记住密码</Checkbox>)

        return(
            <div className="form">
                <Card title="登录行内表单">
                    <Form layout='inline'>
                        <Form.Item><Input placeholder="请输入用户名" /></Form.Item>
                        <Form.Item><Input placeholder="请输入密码" type='password' /></Form.Item>
                        <Form.Item><Button type="primary">登录</Button></Form.Item>
                    </Form>
                </Card>
                <Card title="登录">
                    <Form style={{width: 300}} >
                        <Form.Item>{user_name}</Form.Item>
                        <Form.Item>{password}</Form.Item>
                        <Form.Item>
                            {remember}
                            <a>忘记密码</a>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.submit} type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(MLogin)
