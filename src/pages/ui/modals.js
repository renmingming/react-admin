import React from 'react'
import {Card, Button, Modal} from 'antd'

export default class Modals extends React.Component{

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
    }
    handleOpen = (type) => {
        this.setState({
            [type]: true
        })
    }
    handleConfirm = (type) => {
        Modal[type]({
            title:'react信息框',
            content: (
                <p>react好学吗？？？？</p>
            ),
            onOk() {
                console.log('点击ok')
            }
        })
    }
    render() {
        return(
            <div>
                <Card title="模态框">
                    <Button onClick={() => this.handleOpen('showModal1')}>基本型</Button>
                    <Button onClick={() => this.handleOpen('showModal2')}>自定义按钮text</Button>
                </Card>
                <Card title="信息确认框">
                    <Button onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button onClick={() => this.handleConfirm('error')}>Error</Button>
                    <Button onClick={() => this.handleConfirm('warning')}>Warning</Button>
                    <Button onClick={() => this.handleConfirm('info')}>Info型</Button>
                    <Button onClick={() => this.handleConfirm('success')}>Success</Button>
                </Card>
                <Modal 
                    title="基本型的标题"
                    visible={this.state.showModal1}
                    onCancel={()=>{
                        this.setState({
                            showModal1: false
                        })
                    }}
                >
                    <p>欢迎学习react框架</p>
                </Modal>
                <Modal 
                    title="基本型的标题"
                    visible={this.state.showModal2}
                    okText="好的"
                    cancelText="算了"
                    onCancel={()=>{
                        this.setState({
                            showModal2: false
                        })
                    }}
                >
                    <p>欢迎学习react框架</p>
                </Modal>
            </div>
        )
    }
}