import React from 'react'
import './index.less';
import Header from '../../components/header'
import Footer from '../../components/footer'
import NavLeft from '../../components/nav_left'
import RouterAdmin from './router.js'

class Admin extends React.Component {

    state = {
        left: 0,
        margin_left: 180,
        show: true          // nav的状态 ---> show or hidden
    }

    componentDidMount () {
        // 监听窗口变化
        window.onresize = () => {
            let w = document.body.clientWidth 
            console.log(w)
            if (w<=750) {
                this.setState({left: -180, margin_left: 0, show: false})
            }
            else {
                this.setState({left: 0, margin_left: 180, show: true})
            }
        }
        // 如果是小屏 --> 隐藏nav
        let w = document.body.clientWidth
        if (w<=750) this.setState({left: -180, margin_left: 0, show: false})
    }

    show_hidden = () => {
        let {show} = this.state
        if (show) {
            this.setState({left: -180, margin_left: 0, show: false})
        }
        else {
            this.setState({left: 0, margin_left: 180, show: true})
        }
    }

    render () {
        let {margin_left, left} = this.state
        return (
            <div 
                className='page-admin' 
                style={{marginLeft: margin_left}}>
                <div 
                    className="nav" 
                    style={{left}} >
                    <NavLeft />
                </div>
                <Header show_hidden={this.show_hidden} />
                <RouterAdmin />
                <Footer />
            </div>
        )
    }
}

export default Admin;
