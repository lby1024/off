import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
import Detail from './pages/detail'

export default class App extends React.Component {
    
    render(){
        return(
            <HashRouter>
                <div>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/detail/:id" component={Detail}></Route>
                        <Route path="/" component={Admin}></Route>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}