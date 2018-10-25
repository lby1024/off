import React from 'react'
import {Modal, Card, Button} from 'antd'

export default class MModal extends React.Component {
    state={
        msg01: false,
        msg02: false,
        msg03: false
    }
    cancel_msg (msg) {
        this.setState({[msg]: false})
    }
    alert_msg (msg) {
        this.setState({[msg]: true})
    }
    alert_info (type) {
        Modal[type]({
            title: 'react',
            content: '已经删除',
            onOK: ()=>console.log('ok'),
            onCancel: ()=>console.log('cancel')
        })
    }
    render(){
        return(
            <div className="ui">
                <Card title='对话框' className="btn-wrap">
                    <Button type='primary' onClick={()=>this.alert_msg('msg01')}>基本弹框</Button>
                    <Button type='primary' onClick={()=>this.alert_msg('msg02')}>修改弹框按钮</Button>
                    <Button type='primary' onClick={()=>this.alert_msg('msg03')}>修改弹框位置</Button>
                </Card>
                <Card title='消息框' className="btn-wrap">
                    <Button type='primary' onClick={()=>this.alert_info('confirm')}>yes or no</Button>
                    <Button type='primary' onClick={()=>this.alert_info('info')}>info</Button>
                    <Button type='primary' onClick={()=>this.alert_info('success')}>success</Button>
                    <Button type='primary' onClick={()=>this.alert_info('warning')}>warning</Button>
                </Card>
                {/* msg01 */}
                <Modal
                    title="react"
                    visible={this.state.msg01}
                    onCancel={()=>this.cancel_msg('msg01')} >
                    <p>基本配置</p>
                </Modal>
                {/* msg02 */}
                <Modal 
                    title="react"
                    visible={this.state.msg02}
                    okText="确定"
                    cancelText="取消"
                    onCancel={()=>this.cancel_msg('msg02')} >
                    <p>自定义 : ok--->确定 & cancel---> 取消</p>
                </Modal>
                {/* msg03 */}
                <Modal
                    title="react"
                    style={{'top': '10px'}}
                    visible={this.state.msg03}
                    onCancel={()=>this.cancel_msg('msg03')} >
                    <p>调整竖直方向的高度 ( 只能修改竖向高度 )</p>
                </Modal>
            </div>
        )
    }
}