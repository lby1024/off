import React from 'react'
import './index.less'
import {Menu} from 'antd'
import data_nav from '../../data/nav_data'
import {NavLink} from 'react-router-dom'
import logo from '../../static/logo.png'

const {SubMenu} = Menu

export default class NavLeft extends React.Component {
    
    render_nav=data=>{
        return data.map(item=>{
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.render_nav(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }

    render(){
        let dom_tree = this.render_nav(data_nav)
        return (
            <div className="nav">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                    <p>后台管理</p>
                </div>
                <Menu 
                    theme="dark" 
                    mode="inline"
                    style={{ overflowY: 'auto' }} 
                    defaultSelectedKeys={['/home']}>
                    {dom_tree}
                </Menu>
            </div>
        )
    }
} 
