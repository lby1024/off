import React from 'react'
import {Card, Button, notification} from 'antd'

import './ui.less'

export default class MNotice extends React.Component {   
    show_notice=(type, direction)=>{
        if (direction){
            let placement = direction
            notification.config({placement})
        }
        notification[type]({
            message: '改还钱了',
            description: '下个月10号将自动从你支付宝扣除8000'
        })
    }
    render(){
        return(
            <div className="ui">
                <Card className="btn-wrap" title="通知提醒框">
                    <Button type="primary" onClick={()=>this.show_notice('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.show_notice('info')}>info</Button>
                    <Button type="danger" onClick={()=>this.show_notice('warning')}>warning</Button>
                    <Button type="primary" onClick={()=>this.show_notice('error')}>error</Button>
                </Card>
                <Card className="btn-wrap" title="通知提醒框">
                    <Button type="primary" onClick={()=>this.show_notice('success', 'topLeft')}>success</Button>
                    <Button type="primary" onClick={()=>this.show_notice('info', 'topRight')}>info</Button>
                    <Button type="danger" onClick={()=>this.show_notice('warning', 'bottomLeft')}>warning</Button>
                    <Button type="primary" onClick={()=>this.show_notice('error', 'bottomRight')}>error</Button>
                </Card>
            </div>
        )
    }
}