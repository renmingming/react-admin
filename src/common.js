import React from 'react'
import { Row } from 'antd';
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import './styles/common.scss'
// 通用页面入口文件
export default class Common extends React.Component{
    componentWillMount() {
    }
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second" />
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
                <Row>
                    <Footer />
                </Row>
            </div>
        )
    }
}