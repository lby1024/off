import React from 'react'
import { Card, Spin, Icon, Alert, Button} from 'antd'

export default class MLoading extends React.Component {
    state={
        spin_show: true
    }
    toggle=()=>{
        let spin_show = !this.state.spin_show
        this.setState({spin_show})
    }
    render(){
        const ico = <Icon type='loading' style={{fontSize: 24}}/>
        return(
            <div className="ui">
                <Card title='loading组件' className="btn-wrap">
                    <Spin tip="loading..." size="small"/>
                    <Spin tip="loading..." />
                    <Spin tip="loading..." size="large"/>
                    <Spin tip="loading..." indicator={ico}/>
                </Card>

                <Card title='内容遮罩' className="btn-wrap">
                    <Button type="primary" onClick={this.toggle}>toggle</Button>
                    <Alert 
                        message='info'
                        description="类型为 : type='info'"
                        type = 'info'
                    />
                    <Alert 
                        message='warning'
                        description="类型为 : type=warning"
                        type = 'warning'
                    />
                    <Spin tip="loading" spinning={this.state.spin_show}>
                        <Alert 
                        message='react'
                        description="fuck the fucking world"
                        type = 'info' />
                    </Spin>
                    <Spin indicator={ico} tip="正在加载..." spinning={this.state.spin_show}>
                        <Alert 
                        message='react'
                        description="fuck the fucking world"
                        type = 'warning' />
                    </Spin>
                </Card>
            </div>
        )
    }
}