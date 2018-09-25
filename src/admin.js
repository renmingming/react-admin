import React from 'react'
import { Row, Col } from 'antd';
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import NavLeft from './components/NavLeft/index'
import './styles/common.scss'

export default class Admin extends React.Component{

    render() {
        return (
            <Row className="container">
                <Col span="3" className="nav-left">
                    <NavLeft></NavLeft>
                </Col>
                <Col span="21" className="main">
                    <Header></Header>
                    <Row className="content">
                        {/* <Home></Home> */}
                        {this.props.children}
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        )
    }
}