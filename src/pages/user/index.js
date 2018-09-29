import React from 'react'
import { Card, Button, Table, Form, Select, Modal, Radio, message, DatePicker, Input} from 'antd'
import axios from './../../axios/index'
import BaseForm from '../../components/BaseForm/index.js'
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

export default class User extends React.Component{
    componentWillMount() {
        this.requestList();
    }
    state = {
        pagination: null,
        selectedRowItem: null,
        list: [],
        selectedRowKeys: []
    }
    formList = [{
        type: 'INPUT',
        label: '用户名',
        field: 'user_name',
        initialValue: '任命',
        placeholder: '请输入用户名',
        width:80
    },{
        type: 'INPUT',
        label: '手机号',
        field: 'user_mobile',
        placeholder: '请输入手机号',
        width:80
    },{
        type: 'DATE',
        label: '请选择入职日期',
        field: 'user_date',
        placeholder: '请选择日期',
        width:80
    }]
    params = {
        page: 1
    }
    handleFilter = (params) => {
        this.params = params;
        console.log(params)
        this.requestList()
    }
    requestList = () => {
        axios.requestList(this, '/user/list', this.params)
    }
    onRowClick = (record, index) => {
        let selectedRowKeys = [index];
        console.log(record, index)
        this.setState({
            selectedRowKeys,
            selectedRowItem: record
        })
    }
    // 功能操作
    hanleOperate = (type) => {
        let item = this.state.selectedRowItem;
        if(type === 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工',
                userInfo: {}
            })
        }else if(type === 'edit') {
            if(!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item
            })
        } else if(type === 'detail') {
            if(!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            })
        }else{
            if(!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content: `确定要删除员工：${item.userName}`,
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then(res => {
                        if(res.code === 0) {
                            _this.setState({
                                isVisible: false
                            })
                            message.success(`员工：${item.userName}，删除成功`)
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }
    // 创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type === "create" ? "/user/add" : "/user/edit",
            data: {
                params: data
            }
        }).then(res => {
            if(res.code === 0) {
                this.setState({
                    isVisible: false
                })
                console.log(data)
                message.success(`员工：${data.userName}，信息${type === "create" ? "创建" : "更新"}成功`)
                this.requestList();
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },{
                title: '用户名',
                dataIndex: 'userName'
            },{
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },{
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return {
                        "1": "流浪汉",
                        "2": "闲鱼一条",
                        "3": "风流才子",
                        "4": "实力FE",
                        "5": "创业者"
                    }[state]
                }
            },{
                title: '爱好',
                dataIndex: 'interest',
                render(state) {
                    return {
                        "1": "打篮球",
                        "2": "踢足球",
                        "3": "电竞",
                        "4": "羽毛球",
                        "5": "跨栏"
                    }[state]
                }
            },{
                title: '生日',
                dataIndex: 'birthday'
            },{
                title: '联系地址',
                dataIndex: 'address'
            },{
                title: '早起时间',
                dataIndex: 'time'
            },
        ]
        const roSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        let footer = {}
        if(this.state.type === 'detail') {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card>
                    <Button type="primary" icon="plus" onClick={() => this.hanleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.hanleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" icon="user" onClick={() => {this.hanleOperate('detail')}}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.hanleOperate('deleta')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={roSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    ></Table>
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => {this.userForm = inst}}/>
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component{
    getState = (state) => {
        return {
            "1": "流浪汉",
            "2": "闲鱼一条",
            "3": "风流才子",
            "4": "实力FE",
            "5": "创业者"
        }[state]
    }
    render() {
        let userInfo = this.props.userInfo || {};
        let type = this.props.type;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span:5
            },
            wrapperCol: {
                span: 19
            }
        }
        return(
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.userName : 
                        getFieldDecorator('userName', {
                            initialValue: userInfo.userName
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.sex === 1 ? '男' : "女" :
                        getFieldDecorator('user_sex',{
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type === 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state',{
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>浪子</Option>
                                <Option value={3}>才子</Option>
                                <Option value={4}>FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday',{
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.address :
                        getFieldDecorator('address', {
                            initialValue: userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址" />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create()(UserForm);