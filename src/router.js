import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Home from './pages/home/index.js'
import Login from './pages/login/index'
import Buttons from './pages/ui/buttons/index'
import NoMatch from './pages/nomatch/index'
import Modals from './pages/ui/modals.js'
import Loadings from './pages/ui/loading.js'
import Notifications from './pages/ui/notification.js'
import Messages from './pages/ui/messages.js'
import Tab from './pages/ui/tabs.js'
import Gallerys from './pages/ui/gallery.js'
import Carousels from './pages/ui/carousel.js'
import FormLogin from './pages/form/login.js'
import FormRegister from './pages/form/register.js'
import BasicTable from './pages/table/basicTable.js'
import HighTable from './pages/table/highTable.js'
import RichText from './pages/rich/index.js'
import City from './pages/city/index.js'
import Order from './pages/order/index.js'
import Common from './common.js'
import OrderDetail from './pages/order/detail.js'
import User from './pages/user/index.js'
import BikeMap from './pages/map/bikeMap.js'
import PermissionUser from './pages/permission/index.js'
export default class IRouter extends React.Component{

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common" render={() => 
                            <Common>
                                <Switch>
                                    <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                                </Switch>
                            </Common>
                        } />
                        <Route path="/" render={() => 
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/notification" component={Notifications} />
                                    <Route path="/ui/tabs" component={Tab} />
                                    <Route path="/ui/gallery" component={Gallerys} />
                                    <Route path="/ui/carousel" component={Carousels} />
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/reg" component={FormRegister} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route path="/rich" component={RichText} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/user" component={User} />
                                    <Route path="/bikeMap" component={BikeMap} />
                                    <Route path="/permission" component={PermissionUser} />
                                    <Redirect to="/home" />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                        
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}