import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
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
export default class IRouter extends React.Component{

    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() => 
                        <Admin>
                            <Switch>
                                <Route path="/admin" exact component={Home} />
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notifications} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tab} />
                                <Route path="/admin/ui/gallery" component={Gallerys} />
                                <Route path="/admin/ui/carousel" component={Carousels} />
                                <Route path="/admin/form/login" component={FormLogin} />
                                <Route path="/admin/form/reg" component={FormRegister} />
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                </App>
            </HashRouter>
        )
    }
}