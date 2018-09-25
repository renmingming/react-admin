import React from 'react'
import { Row, Col } from 'antd'
import './index.scss'
import Util from '../../utils/utils'
// import axios from '../../axios/index'
export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sysTime: '',
            userName: '',
        }
    }
    componentWillMount() {
        this.setState({
            userName: 'renmingming'
        })
        setInterval(() => {
            let sysTime = Util.formteDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherAPIData();
    }
    getWeatherAPIData() {
        // let city = '北京';
        // let url1 = `https://www.sojson.com/open/api/weather/json.shtml?city=${encodeURIComponent(city)}`;
        // axios.jsonp({
        //     url: url1
        // }).then((res) => {
        //     console.log(res)
        //     if(res.status === 'success') {
        //         // let data = res.results[0]
        //     }
        // })
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎、{this.state.userName}</span>
                        <a href="##">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">
                            晴转多云
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}