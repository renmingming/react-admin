import React from 'react'
import {Button, Card, notification } from 'antd'
import './index.scss'

export default class Notification extends React.Component{
    openNotification = (type) => {
        notification[type]({
            message: 'Notification Title RMM',
            description: '欢迎学习REact框架，还能学的动吗？'
        })
    }
    render() {
        return(
            <div>
                <Card title="通知提醒框">
                    <Button onClick={() => this.openNotification('open')}>Open the notification</Button>
                    <Button onClick={() => this.openNotification('info')}>Info the notification</Button>
                    <Button onClick={() => this.openNotification('success')}>Success the notification</Button>
                    <Button onClick={() => this.openNotification('warning')}>Warning the notification</Button>
                    <Button onClick={() => this.openNotification('error')}>Error the notification</Button>
                </Card>
            </div>
        )
    }
}