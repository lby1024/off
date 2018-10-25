import React from 'react'
import {Card, Tabs, message, Icon} from 'antd'

import './ui.less'

const TabPane = Tabs.TabPane

export default class MTab extends React.Component {   

    componentWillMount(){
        const panes = [
            { tab: 'Tab 1', content: 'Tab 1', key: '1' },
            { tab: 'Tab 2', content: 'Tab 2', key: '2' },
            { tab: 'Tab 3', content: 'Tab 3', key: '3' }
        ]
        let activeKey = panes[0].key
        this.new_tab_num = panes.length+1
        this.setState({ panes, activeKey})
    }
    new_tab_num = 0
    msg=tab=>message.info(`你切换到了页面${tab}`)
    onChange = activeKey => this.setState({activeKey})
    onEdit = (targetKey, action) => this[action](targetKey)
    add = () => {
        let activeKey = `tab${this.new_tab_num++}`
        let new_tab = {tab: activeKey, content: activeKey, key: activeKey}
        let panes = this.state.panes
        panes.push(new_tab)
        this.setState({panes, activeKey})
    }
    remove = targetKey=>{
        let panes = this.state.panes
        panes = panes.filter(item=>targetKey!==item.key)
        this.setState({panes})
    }
    render(){

        let tab01 = <span><Icon type="plus"/>政治</span>
        let tab02 = <span><Icon type="edit"/>体育</span>
        let tab03 = <span><Icon type="delete"/>娱乐</span>

        let dom_list_tab = this.state.panes.map(item=>
            <TabPane
                tab={item.tab}
                key={item.key}>
                {item.content}
            </TabPane>)

        return(
            <div className="ui">
                <Card className="btn-wrap" title="Tab基本配置">
                    <Tabs defaultActiveKey="1" onChange={this.msg}>
                        <TabPane tab="政治" key="1">政治新闻丶政治新闻丶政治新闻丶</TabPane>
                        <TabPane tab="体育" key="2" disabled>体育新闻丶体育新闻丶体育新闻丶</TabPane>
                        <TabPane tab="娱乐" key="3">娱乐新闻丶娱乐新闻丶娱乐新闻丶</TabPane>
                    </Tabs>
                </Card>
                <Card className="btn-wrap" title="有 icon 的 tab">
                    <Tabs defaultActiveKey="1" onChange={this.msg} >
                        <TabPane tab={tab01} key="1">政治新闻丶政治新闻丶政治新闻丶</TabPane>
                        <TabPane tab={tab02} key="2" disabled>体育新闻丶体育新闻丶体育新闻丶</TabPane>
                        <TabPane tab={tab03} key="3">娱乐新闻丶娱乐新闻丶娱乐新闻丶</TabPane>
                    </Tabs>
                </Card>
                <Card title="删除 & 增加" className="card-wrap">
                    <Tabs 
                        onChange={this.onChange}
                        onEdit={this.onEdit}
                        activeKey={this.state.activeKey}
                        type="editable-card" >
                        {dom_list_tab}
                    </Tabs>
                </Card>
            </div>
        )
    }
}