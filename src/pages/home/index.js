import React from 'react'
import {Card} from 'antd'

import './index.less'

export default class Home extends React.Component {
    render(){
        return (
            <div className="home">
                <div className="box">
                    <Card title="标题">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, eum 
                    </Card>
                </div>
            </div>
        )
    }
} 
