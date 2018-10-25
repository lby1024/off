import React from 'react'
import {Card, Row, Col, Modal} from 'antd'

import './ui.less'

export default class MGallery extends React.Component {   

    state = {
        cur_pic: '11.png',
        is_alert: false
    }

    get_dom_list (list) {
        return list.map((item, index)=>
            <Card 
                onClick={()=>this.alert_pic(item)}
                style={{marginBottom: 18}}
                key={index}
                cover={<img src={require(`../../static/gallery/${item}`)} alt="pic" />} >
                <Card.Meta
                    title='title'
                    description='fuck the fucking world!!!' >
                </Card.Meta>
            </Card>
        )
    }

    alert_pic = name => {
        let cur_pic = name
        let is_alert = true
        this.setState({cur_pic, is_alert})
    }  
    cancel_pic = () => {
        let is_alert = false
        this.setState({is_alert})
    }  

    render(){
        const imgs = [
            ['11.png', '11.png', '11.png', '11.png', '11.png'],
            ['11.png', '11.png', '11.png', '11.png', '11.png'],
            ['11.png', '11.png', '11.png', '11.png', '11.png'],
            ['11.png', '11.png', '11.png', '11.png', '11.png'],
            ['11.png', '11.png', '11.png', '11.png', '11.png']
        ]

        let dom_tree_card = imgs.map((list, index)=>
            <Col key={index} md={4}>
                {this.get_dom_list(list)}
            </Col>
        )

        return(
            <div className="ui">
                <Row 
                    className='gallery'
                    gutter={20}
                    type='flex' 
                    justify='center' >
                    {dom_tree_card}
                </Row>
                <Modal 
                    width={440}
                    height={500}
                    footer={null}
                    onCancel={this.cancel_pic}
                    visible={this.state.is_alert}
                    title='图片画廊' >
                    <img 
                        src={require(`../../static/gallery/${this.state.cur_pic}`)}  
                        alt="pic" 
                        style={{width: '100%'}}
                    />
                </Modal>
            </div>
        )
    }
}