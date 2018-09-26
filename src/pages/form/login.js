import React from 'react'
import {Card, Form, Button, Input, message, Checkbox, Icon } from 'antd'

const FormItem = Form.Item

class FormLogin extends React.Component{
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, vallue) => {
            if(!err) {
                message.success(`${userInfo.userName} 恭喜您，您通过登录，当前密码为：${userInfo.userPwd}`)
            }
        })
        console.log(userInfo)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Card title="行内登录表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="水平登录表单">
                    <Form style={{width:'300px'}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写用户名'
                                        },
                                        {
                                            min: 5,
                                            max: 10,
                                            message: '最大长度为10，最小长度为5'
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '用户名必须为字母或数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input prefix={<Icon type="lock" />} placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(FormLogin)