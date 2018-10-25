import React from 'react';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom'
import Home from '../home'
import MButtons from '../ui/buttons.js'
import MModal from '../ui/modal.js'
import MLoading from '../ui/loading.js'
import MNotice from '../ui/notice.js'
import MMessage from '../ui/message.js'
import MTab from '../ui/tab.js'
import MGallery from '../ui/gallery.js'
import MCarousel from '../ui/carousel.js'
import MLogin from '../form/login.js'
import MReg from '../form/register.js'
import BaseTab from '../table/base_table.js'
import Tab02 from '../table/table02.js'
import Cty from '../city'
import Oders from '../order'
import User from '../users'
import BikeMap from '../map'
import Bar from '../echarts/bar'
import Pie from '../echarts/pie'
import Line from '../echarts/line'
import Editor from '../editor'
import Root from '../root'

export default class RouterAdmin extends React.Component {
    
    render(){
        return(
            <HashRouter>
                <div>
                    <Switch>
                        <Route path="/home" component={BikeMap}></Route>
                        <Route path="/ui/buttons" component={MButtons}></Route>
                        <Route path="/ui/modals" component={MModal}></Route>
                        <Route path="/ui/loadings" component={MLoading}></Route>
                        <Route path="/ui/notification" component={MNotice}></Route>
                        <Route path="/ui/messages" component={MMessage}></Route>
                        <Route path="/ui/tabs" component={MTab}></Route>
                        <Route path="/ui/gallery" component={MGallery}></Route>
                        <Route path="/ui/carousel" component={MCarousel}></Route>
                        <Route path="/form/login" component={MLogin}></Route>
                        <Route path="/form/reg" component={MReg}></Route>
                        <Route path="/table/basic" component={BaseTab}></Route>
                        <Route path="/table/high" component={Tab02}></Route>
                        <Route path="/city" component={Cty}></Route>
                        <Route path="/order" component={Oders}></Route>
                        <Route path="/user" component={User}></Route>
                        <Route path="/bikeMap" component={BikeMap}></Route>
                        <Route path="/charts/bar" component={Bar}></Route>
                        <Route path="/charts/pie" component={Pie}></Route>
                        <Route path="/charts/line" component={Line}></Route>
                        <Route path="/rich" component={Editor}></Route>
                        <Route path="/permission" component={Root}></Route>
                        <Redirect to="/home" />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}