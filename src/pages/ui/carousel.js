import React from 'react'
import {Card, Carousel} from 'antd'

import './ui.less'

export default class MCarousel extends React.Component {   
    
    render(){
        return(
            <div className="ui">
                <Card className="btn-wrap" title="轮播图 : 滑动">
                    <Carousel autoplay>
                        <div><img src={require('../../static/carousel-img/carousel-1.jpg')} alt="pic" width="100%" /></div>
                        <div><img src={require('../../static/carousel-img/carousel-2.jpg')} alt="pic" width="100%" /></div>
                        <div><img src={require('../../static/carousel-img/carousel-3.jpg')} alt="pic" width="100%" /></div>
                    </Carousel>
                </Card>
                <Card className="btn-wrap" title="轮播图 : fade">
                    <Carousel autoplay effect='fade'>
                        <div><img src={require('../../static/carousel-img/carousel-1.jpg')} alt="pic" width="100%" /></div>
                        <div><img src={require('../../static/carousel-img/carousel-2.jpg')} alt="pic" width="100%" /></div>
                        <div><img src={require('../../static/carousel-img/carousel-3.jpg')} alt="pic" width="100%" /></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}