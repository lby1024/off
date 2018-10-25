import React from 'react'

export default class Login extends React.Component {
    
    componentDidMount() {
        this.one.fn()
    }

    render(){
        return(
            <div>
                <p>这是登录页面</p>
                <One c2f={self=>this.one=self} />
            </div>
        )
    }
}

class One extends React.Component {

    componentWillMount() {
        this.props.c2f(this)
    }
    componentDidMount() {
        this.tow.fn()
    }

    fn = () => alert('one')

    render () {
        return (
            <div>
                one --->
                <Tow c2f={self=>this.tow=self}/>
            </div>
        )
    }
}

class Tow extends React.Component {

    componentWillMount() {
        this.props.c2f(this)
    }
    fn = () => alert('tow')

    render () {
        return (
            <div>
                tow --->
            </div>
        )
    }
}