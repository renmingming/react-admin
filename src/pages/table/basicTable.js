import React from 'react'
import {Card, Table, Modal, message, Button} from 'antd'
import axios from './../../axios/index.js'
import Utils from './../../utils/utils.js'

export default class BasicTable extends React.Component{
    componentWillMount() {
        const dataSource = [
            {
                key: '0',
                id: '0',
                userName: 'renmingming',
                sex: '1',
                state: '1',
                interest: '1',
                isMarried: '1',
                birthday: '20001-01-01',
                address: 'asdfsadf',
                time: '09:00:00'
            }
        ]
        this.setState({
            dataSource,
            dataSource2: []
        })
        this.request();
    }
    params = {
        page: 1
    }
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page,
                },
                // isShowLoading: false
            }
        }).then((res) => {
            if(res.code === 0){
                res.result.list.map((item,index) => {
                    return item.key = index
                })
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current
                        _this.request()
                    })
                })
            }
        })
    }
    onRowClick = (record, index) => {
        // 点击航事件
        let selectKey = [index]; // 数组可能多选
        Modal.info({
            title: `信息`,
            content: `用户名：${record.userName}`
        })
        this.setState({
            selectedRowKeys: selectKey, // 行索引
            selectedItem: record // 行信息
        })
    }
    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            return ids.push(item.id)
        })
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗？id: ${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功！')
                this.request()
            }
        })
    }
    render() {
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key:'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render(state) {
                    let config = {
                        "1": "咸鱼一个",
                        "2": "风华浪子",
                        "3": "北大才子",
                        "4": "百度FE",
                        "5": "创业者"
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                key: 'interest',
                render(state) {
                    let config = {
                        "1": "打篮球",
                        "2": "踢足球",
                        "3": "羽毛球",
                        "4": "电竞",
                        "5": "浪"
                    }
                    return config[state]
                }
            },
            {
                title: '是否已婚',
                dataIndex: 'isMarried',
                key: 'isMarried',
                render(state) {
                    return state === 1 ? '是' : '否'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '起床时间',
                dataIndex: 'time',
                key: 'time',
            }
        ]
        return (
            <div>
                <Card title="基础表格">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="Mock-动态数据渲染表格">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title="Mock-单选">
                    <Table 
                        // 单选或多选
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => { // 点击行
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-复选">
                    <div style={{marginBottom:'15px'}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                        // 多选
                        rowSelection={rowCheckSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => { // 点击行
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-分页">
                    <div style={{marginBottom:'15px'}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                        // 多选
                        rowSelection={rowCheckSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => { // 点击行
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}