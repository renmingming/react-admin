import React from 'react'
import { Card } from 'antd'
import axios from './../../axios/index'
import './detail.scss'

export default class OrderDetail extends React.Component{
    state = {
        orderInfo: null
    }
    componentWillMount() {
        let orderId = this.props.match.params.orderId;
        if(orderId) {
            this.getDetailInfo(orderId)
        }
    }
    getDetailInfo = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            if(res.code === 0) {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result)
            }
        })
    }
    renderMap = (result) => {
        this.map = new window.BMap.Map("orderDetailMap");
        // this.map.centerAndZoom('北京', 11); 地图中心
        // 控件
        this.addMapControl();
        // 绘制行车路线
        this.drawBikeRoute(result.position_list);
        // 绘制服务区
        this.drawServiceArea(result.area)
    }
    // 添加控件
    addMapControl = () => {
        let map = this.map;
        // 2D图，卫星图
        map.addControl(new window.BMap.MapTypeControl({
            mapTypes:[
                window.BMAP_NORMAL_MAP,
                window.BMAP_HYBRID_MAP
            ]}))
            // 左上角，默认地图控件
        map.addControl(new window.BMap.MapTypeControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}))
        //左上角，添加默认缩放平移控件
        map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL}))
    }
    // 路线图
    drawBikeRoute = (positionList) => {
        let startPoint = '';
        let endPoint = '';
        if(positionList.length > 0){
            // 起点坐标
            let first = positionList[0];
            let last = positionList[positionList.length-1];
            startPoint = new window.BMap.Point(first.lon, first.lat);
            // 起始icon和大小
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })

            let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon});
            this.map.addOverlay(startMarker)

            // 终点Marker
            endPoint = new window.BMap.Point(last.lon, last.lat);
            // 终点icon和大小
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon});
            this.map.addOverlay(endMarker)


            // 连接路线图
            let trackPoint = [];
            for(let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat))
            }

            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor: '#1869ad',
                strokeWeight: 3,
                strokeOpacity: 1
            })

            this.map.addOverlay(polyline)

            

            this.map.centerAndZoom(endPoint, 11);
        }
    }

    //  绘制服务区
    drawServiceArea = (positionList) => {
        if(positionList.length > 0){
            let trackPoint = [];
            for(let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat))
            }

            let polygon = new window.BMap.Polygon(trackPoint, {
                strokeColor: '#1869ad',
                strokeWeight: 4,
                strokeOpacity: 1,
                fillColor: 'green',
                fillOpacity: 0.3
            })
            this.map.addOverlay(polygon)
        }
    }
    render() {
        let info = this.state.orderInfo || {};
        console.log(info)
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ? '停车点' : '禁停区'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶历程</div>
                                <div className="detail-form-content">{info.distance}</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}