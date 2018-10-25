import React from 'react'
import {
    Card, Input, Form, Button, Checkbox, message, Icon, Radio,
    InputNumber, Select, Switch, DatePicker, TimePicker, Upload
} from 'antd'

import './form.less'

class MLogin extends React.Component {   

    state = {}

    get_img_url (img_data) {
        return new Promise((resolve, reject)=>{
            let reader = new FileReader()
            reader.readAsDataURL(img_data)
            reader.addEventListener('load', ()=>resolve(reader.result))
        })
    }
    // ↓ ↓ ↓ ↓ ↓ ↓ 上传中、完成、失败都会调用这个函数
    change = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true})
        } 
        else if (info.file.status === 'done') {
            this.get_img_url(info.file.originFileObj).then(img_url=>{
                let loading = false
                this.setState({img_url, loading})
            })
        }
    }

    submit = ()=>{
        let userInfo = this.props.form.getFieldsValue()
        this.props.form.validateFields((err)=>{      
            if(err){                                        // 如果未能通过表单验证
                message.error('注册失败')
            }
            else {                                          // 如果通过表单验证                
                console.log(JSON.stringify(userInfo))
                message.success(`恭喜${userInfo.user_name} 登录成功，当前密码为：${userInfo.password}`)
            }
        })
    }

    render(){

        let {getFieldDecorator} = this.props.form
        // 栅格布局======栅格布局======栅格布局======栅格布局======栅格布局======
        let form_layout01 = {
            labelCol:{ sm:24, md:4 },   // label 在小屏, 中屏下的布局
            wrapperCol:{ sm:24, md:12 } // input 在小屏, 中屏下的布局
        }
        let form_layout02 = {
            wrapperCol:{ sm:24, md:{span: 6, offset: 4} } // input 在小屏, 中屏下的布局
        }
        // 用户名======用户名======用户名======用户名======用户名======
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
        // 密码======密码======密码======密码======密码======密码======密码======
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
        // 性别======性别======性别======性别======性别======性别======性别======性别======性别======
        let sex_options = { initialValue: '1' }     // 初始值
        let sex_dom = 
            <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
            </Radio.Group>
        let sex = getFieldDecorator('sex', sex_options)(sex_dom)
        // 年龄======年龄======年龄======年龄======年龄======年龄======年龄======年龄======年龄======
        let age_options = { initialValue: '18' }     // 初始值
        let age_dom = <InputNumber/>
        let age = getFieldDecorator('age', age_options)(age_dom)
        // 下拉选项======下拉选项======下拉选项======下拉选项======下拉选项======下拉选项======下拉选项======
        let m_state_options = { initialValue: '1' }     // 初始值
        let m_state_dom = 
            <Select>
                <Select.Option value="1">咸鱼一条</Select.Option>
                <Select.Option value="2">风华浪子</Select.Option>
                <Select.Option value="3">北大才子一枚</Select.Option>
                <Select.Option value="4">百度FE</Select.Option>
                <Select.Option value="5">创业者</Select.Option>
            </Select>
        let m_state = getFieldDecorator('m_state', m_state_options)(m_state_dom)  
        // 标签======标签======标签======标签======标签======标签======标签======标签======标签======标签======
        let interest_options = { initialValue: ['1', '3'] }     // 初始值
        let interest_dom = 
            <Select mode="multiple">
                <Select.Option value="1">游泳</Select.Option>
                <Select.Option value="2">打篮球</Select.Option>
                <Select.Option value="3">踢足球</Select.Option>
                <Select.Option value="4">跑步</Select.Option>
                <Select.Option value="5">爬山</Select.Option>
                <Select.Option value="6">骑行</Select.Option>
                <Select.Option value="7">桌球</Select.Option>
                <Select.Option value="8">麦霸</Select.Option>
            </Select>
        let interest = getFieldDecorator('interest', interest_options)(interest_dom)   
        // 婚否======婚否======婚否======婚否======婚否======婚否======婚否======婚否======婚否======婚否======
        let is_married_options = {
            valuePropName:'checked',    // 如果没有这个属性, 下面的initialValue 将会失效
            initialValue: false
        }
        let is_married_dom = <Switch/>
        let is_married = getFieldDecorator('is_married', is_married_options)(is_married_dom) 
        // 生日======生日======生日======生日======生日======生日======生日======生日======生日======生日======
        let birthday_options = {}
        let birthday_dom = <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        let birthday = getFieldDecorator('birthday', birthday_options)(birthday_dom)
        // 地址======地址======地址======地址======地址======地址======地址======地址======地址======地址======
        let address_options = {initialValue:'断罪小学'}
        let text_layout = {minRows: 4, maxRows: 6}  // 文本框---> 最少4行, 最多6行
        let address_dom = <Input.TextArea autosize={text_layout} />
        let address = getFieldDecorator('address', address_options)(address_dom) 
        // 起床时间======起床时间======起床时间======起床时间======起床时间======起床时间======起床时间======
        let m_time_options = {}
        let m_time_dom = <TimePicker/>
        let m_time = getFieldDecorator('m_time', m_time_options)(m_time_dom)
        // 上传头像======上传头像======上传头像======上传头像======上传头像======上传头像======上传头像======
        let user_pic_dom =
            <Upload
                listType="picture-card" // 上传按钮的样式
                showUploadList={false}  // 是否显示上传过的所有图片
                action="//jsonplaceholder.typicode.com/posts/"
                // ↓ ↓ ↓ ↓ ↓ ↓ 上传中、完成、失败都会调用这个函数。
                onChange={this.change}>
                {this.state.img_url?<img src={this.state.img_url} alt="pic" />:<Icon type="plus"/>}    
            </Upload>
        let user_pic = getFieldDecorator('user_pic')(user_pic_dom)
        // 协议======协议======协议======协议======协议======协议======协议======协议======协议======协议======
        let agreement_options = {
            valuePropName:'checked',    // 如果没有这个属性 ---> initialValue: true ---> 将失效
            initialValue: true
        }
        let agreement_dom = 
            <Checkbox>
                我已阅读过
                <a>*****协议</a>
            </Checkbox>
        let agreement = getFieldDecorator('agreement', agreement_options)(agreement_dom)


        return(
            <div className="form">
                <Form>
                    <Card title="注册">
                        <Form.Item 
                            label="用户名" 
                            {...form_layout01} >
                            {user}
                        </Form.Item>
                        <Form.Item 
                            label="密码" 
                            {...form_layout01} >
                            {password}
                        </Form.Item>
                        <Form.Item 
                            label="性别" 
                            {...form_layout01} >
                            {sex}
                        </Form.Item>
                        <Form.Item 
                            label="年龄" 
                            {...form_layout01} >
                            {age}
                        </Form.Item>
                        <Form.Item 
                            label="当前状态" 
                            {...form_layout01} >
                            {m_state}
                        </Form.Item>
                        <Form.Item 
                            label="爱好" 
                            {...form_layout01} >
                            {interest}
                        </Form.Item>
                        <Form.Item 
                            label="婚否" 
                            {...form_layout01} >
                            {is_married}
                        </Form.Item>
                        <Form.Item 
                            label="生日" 
                            {...form_layout01} > 
                            {birthday}
                        </Form.Item>
                        <Form.Item 
                            label="地址"
                            {...form_layout01} > 
                            {address}
                        </Form.Item>
                        <Form.Item 
                            label="起床时间"
                            {...form_layout01} > 
                            {m_time}
                        </Form.Item>
                        <Form.Item 
                            label="上传头像"
                            {...form_layout01} > 
                            {user_pic}
                        </Form.Item>
                        <Form.Item 
                            {...form_layout02} > 
                            {agreement}
                        </Form.Item>
                        <Form.Item {...form_layout02}>
                            <Button type="primary" onClick={this.submit}>
                                注册
                            </Button>
                        </Form.Item>
                    </Card>
                </Form>
            </div>
        )
    }
}

export default Form.create()(MLogin)
