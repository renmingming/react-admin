import React from 'react'
import {Card, Button} from 'antd'
import '../index.scss'

export default class Buttons extends React.Component{
    state = {
        loading: true
    }
    handleClaseLoading = () => {
        this.setState({
            loading: false
        })
    }
    render() {
        return (
            <div>
                <Card title="基础按钮">
                    <Button type="primary">RMM</Button>
                    <Button type="dashed">RMM</Button>
                    <Button type="danger">RMM</Button>
                    <Button>RMM</Button>
                </Card>
                <Card title="圆形按钮">
                    <Button type="primary" shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">RMM</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button icon="search">RMM</Button>
                </Card>
                <Card title="加载中按钮">
                    <Button type="primary" loading={this.state.loading}>Loading</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary"  shape="circle" icon="poweroff" onClick={this.handleClaseLoading}></Button>
                    
                </Card>
            </div>
        )
    }
}