import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from './../route1/Main'
import About from './../route1/About'
import Topic from './../route1/topic'
import Home from './home'

export default class IRouter extends React.Component{
    render() {
        return (
            <Router>
                <Home>
                    <Route exact={true} path="/" component={Main}></Route>
                    <Route path="/about" component={About}></Route>
                     <Route path="/topics" component={Topic}></Route>
                </Home>
            </Router>
        )
    }
}