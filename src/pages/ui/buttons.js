import React from 'react'
import {Card, Button, Icon, Radio} from 'antd'

import './ui.less'

export default class MButton extends React.Component {   
    state = {
        size: 'default',
        loading: true,
        txt: '结束加载'
    }
    loading_over=()=>{
        let loading
        let txt
        if (this.state.loading){
            loading = false
            txt = '加载'
        }
        else{
            loading = true
            txt = '结束加载'
        }
        this.setState({loading, txt})
    } 
    change=e=>{
        let size = e.target.value
        this.setState({size})
    }

    render(){
        return(
            <div className="ui">
                <Card className="btn-wrap" title="基础按钮">
                    <Button type="primary">基本</Button>
                    <Button>默认</Button>
                    <Button type="dashed">虚线</Button>
                    <Button type="danger">警告</Button>
                    <Button disabled>禁止使用</Button>
                </Card>
                <Card className="btn-wrap" title="给按钮加图标">
                    <Button icon="plus">加号</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle"></Button>
                    <Button icon="search" type="primary">搜索</Button>
                    <Button icon="download" type="primary">下载</Button>
                </Card>
                <Card className="btn-wrap" title="loading按钮">
                    <Button type="primary" loading={this.state.loading}>正在加载...</Button>
                    <Button icon="search" shape="circle" loading={this.state.loading}></Button>
                    <Button icon="search" shape="circle" loading={this.state.loading} type="primary"></Button>
                    <Button loading={this.state.loading}>正在加载</Button>
                    <Button type="primary" onClick={this.loading_over}>{this.state.txt}</Button>
                </Card>
                <Card title="按钮尺寸" className="btn-wrap">
                    <Radio.Group value={this.state.size} onChange={this.change}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group> 
                    <Button type="primary" size={this.state.size}>primary</Button>
                    <Button type="dashed" size={this.state.size}>dashed</Button>
                    <Button type="danger" size={this.state.size}>danger</Button>
                    <Button size={this.state.size}>default</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary"><Icon type="left"/>返回</Button>
                        <Button type="primary">前进<Icon type="right"/></Button>
                    </Button.Group>
                </Card>
            </div>
        )
    }
}