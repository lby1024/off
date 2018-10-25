import React from 'react'
import './index.less'
import {Icon} from 'antd'

export default class Header extends React.Component {
    state = {
        user: {name: 'admin', pic: 'https://avatars1.githubusercontent.com/u/20128368?s=460&v=4'}
    }

    render(){
        let {user} = this.state
        let {show_hidden} = this.props
        return (
            <div className="header">
                <div className="left" onClick={show_hidden} >
                    <Icon 
                        type="bars" 
                        theme="outlined" 
                        style={{'fontSize': '27px'}} >
                    </Icon>
                </div>
                <div className="right">
                    <div 
                        className="user-pic" 
                        style={{'backgroundImage': `url(${user.pic})`}} >    
                    </div>
                    <span>退出</span>
                </div>
            </div>
        )
    }
} 
