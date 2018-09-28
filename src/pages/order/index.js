import React from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd'
import axios from './../../axios/index'
// import Utils from './../../utils/utils'
// import BaseForm from '../../components/BaseForm/index.js'

const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component{
    state = {
        orderInfo: [],
        selectedRowKeys: [],
        selectedItem: null,
        orderConfirmVisible: false
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [
                {
                    id: '0',
                    name: '全部'
                },
                {
                    id: '1',
                    name: '北京'
                },
            ]
        },{
            type: '时间查询',
            label: '订单查询',
        },{
            type: 'SELECT',
            label: '订单状态',
            field: 'order_states',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [
                {
                    id: '0',
                    name: '全部'
                },
                {
                    id: '1',
                    name: '进行中'
                },
            ]
        },
    ]
    componentWillMount() {
        this.requestList()
    }
    requestList = () => {
        // let _this = this;
        axios.requestList(this, '/order/list', this.params)
        // axios.ajax({
        //     url: '/order/list',
        //     data: {
        //         params: {
        //             page: this.params.page
        //         }
        //     }
        // }).then((res) => {
        //     if(res.code === 0) {
        //         let list = res.result.item_list.map((item,index) => {
        //             item.key = index;
        //             return item;
        //         })
        //         this.setState({
        //             list,
        //             pagination: Utils.pagination(res, (current) => {
        //                 _this.params.page = current;
        //                 _this.requestList()
        //             })
        //         })
        //     }
        // })
    }
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    onRowClick = (record, index) => {
        console.log(record, index)
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if(res.code === 0) {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisible: true
                })
            }
        })
    }
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if(res.code === 0) {
                message.success(`编号：${item.id},订单结束成功`)
                this.setState({
                    orderConfirmVisible: false
                })
                this.requestList();
            }
        })
    }
    render() {
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        const formItemLayout = {
            labelCol: {
                span:5
            },
            wrapperCol: {
                span: 10
            }
        }
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },{
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },{
                title: '用户名',
                dataIndex: 'user_name'
            },{
                title: '手机号',
                dataIndex: 'mobile'
            },{
                title: '历程',
                dataIndex: 'distance'
            },{
                title: '行驶时长',
                dataIndex: 'total_time'
            },{
                title: '状态',
                dataIndex: 'status'
            },{
                title: '开始时间',
                dataIndex: 'start_time'
            },{
                title: '结束时间',
                dataIndex: 'end_time'
            },{
                title: '订单金额',
                dataIndex: 'total_fee'
            },{
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <Button onClick={this.openOrderDetail}>订单详情</Button>
                    <Button onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
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
                    width={600}
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisible: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

class FilterForm extends React.Component{
    reset = () => {
        this.props.form.resetFields();
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id') (
                            <Select
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">深圳市</Option>
                                <Option value="3">上海市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker style={{width:155}} showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem label="~" colon={false}>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker style={{width:155}} showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('en_mode')(
                            <Select
                                style={{width: 80}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create()(FilterForm);