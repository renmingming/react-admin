import React from 'react'
import { Card, Button, message } from 'antd'

export default class Messages extends React.Component{
    showMessage = (type) => {
        message[type](`This is a ${type}`)
    }
    render() {
        return(
            <div>
                <Card title="基础用法">
                    <Button onClick={() => this.showMessage('info')}>Info</Button>
                    <Button onClick={() => this.showMessage('success')}>Success</Button>
                    <Button onClick={() => this.showMessage('error')}>Error</Button>
                    <Button onClick={() => this.showMessage('warning')}>Warning</Button>
                    <Button onClick={() => this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}