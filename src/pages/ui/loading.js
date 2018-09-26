import React from 'react'
import { Card, Spin, Icon, Alert} from 'antd'
import './index.scss'

export default class Loadings extends React.Component{
    render() {
        const icon = <Icon type="loading" />
        return (
            <div>
                <Card title="spin用法">
                    <Spin />
                    <Spin size="small" />
                    <Spin size="large" />
                    <Spin indicator={icon} />
                </Card>
                <Card title="内容遮罩">
                    <Alert
                     message="renmingming react Alert"
                     description="欢迎来到RMM后台管理"
                     type="info" />
                     <Spin>
                        <Alert
                        message="react Alert"
                        description="欢迎来到RMM后台管理renmingming "
                        type="success" />
                     </Spin>
                </Card>
            </div>
        )
    }
}