import React from 'react'
import { Card, Form, Button, Input, Checkbox, Radio, Switch, Select, DatePicker, TimePicker, Upload, Icon, message, InputNumber} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea
class FormRegister extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userimg: null,
            loading: false,
        }
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
              userimg: imageUrl,
              loading: false,
            }));
        }
    }
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        message.success(`${userInfo.userName} 恭喜您，注册成功！ 密码为：${userInfo.userPwd}`)
        console.log(JSON.stringify(userInfo))
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs:24,
                sm: {
                    span:12,
                    offset: 4
                }
            }
        }
        return(
            <div>
                <Card>
                    <Form>
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写用户名'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">风华浪子</Option>
                                        <Option value="3">北大才子</Option>
                                        <Option value="4">百度FE</Option>
                                        <Option value="5">流浪者</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ['2','4'],
                                    rules: []
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">电竞</Option>
                                        <Option value="5">羽毛球</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-08-12'),
                                    rules: []
                                })(
                                    <DatePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '中国',
                                    rules: []
                                })(
                                    <TextArea 
                                        autosize={
                                            {
                                                minRows: 1,
                                                maxRows: 5
                                            }
                                        }
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="上传头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userimg')(
                                    <Upload 
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        showUploadList={false}
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userimg ? <img src={this.state.userimg} alt="" /> : <Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            {
                                getFieldDecorator('xeiyi')(
                                    <Checkbox>我已阅读<a href="">平台协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormRegister)