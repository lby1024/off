import React from 'react'
import {Card, Button, message} from 'antd'

import './ui.less'

export default class MMsg extends React.Component {   
    show_message=type=>{
        message[type]('还钱!还钱!还钱!还钱!')
    }
    render(){
        return(
            <div className="ui">
                <Card className="btn-wrap" title="微型通知框">
                    <Button type="primary" onClick={()=>this.show_message('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.show_message('info')}>info</Button>
                    <Button type="danger" onClick={()=>this.show_message('warning')}>warning</Button>
                    <Button type="primary" onClick={()=>this.show_message('error')}>error</Button>
                    <Button type="primary" onClick={()=>this.show_message('loading')}>loading</Button>
                </Card>
            </div>
        )
    }
}