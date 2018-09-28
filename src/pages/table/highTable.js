import React from 'react'
import {Card, Table, Modal, message, Button, Badge} from 'antd'
import axios from './../../axios/index.js'

export default class HightTable extends React.Component{
    componentWillMount() {
        this.setState({
            dataSource2: []
        })
        this.request();
    }
    params = {
        page: 1
    }
    request = () => {
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
                    selectedRows: null
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
    handleDelete2 = (item) => {
        let id = item.id;
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗？id: ${id}`,
            onOk: () => {
                message.success('删除成功！')
                this.request()
            }
        })
    }
    handleChange = (pagination, filters, sorter) => {
        console.log(sorter)
        this.setState({
            sortOrder: sorter.order
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
                width: 80,
                dataIndex: 'id',
                key:'id'
            },
            {
                title: '用户名',
                width: 80,
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '性别',
                width: 80,
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                width: 120,
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
                width: 120,
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
                width: 120,
                dataIndex: 'isMarried',
                key: 'isMarried',
                render(state) {
                    return state === 1 ? '是' : '否'
                }
            },
            {
                title: '生日',
                width: 120,
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
                width: 120,
                dataIndex: 'time',
                key: 'time',
            }
        ]
        const columns2 = [
            {
                title: 'id',
                width: 120,
                fixed: 'left',
                dataIndex: 'id',
                key:'id'
            },
            {
                title: '用户名',
                width: 120,
                fixed: 'left',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '性别',
                width: 120,
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                width: 150,
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
                width: 150,
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
                width: 150,
                dataIndex: 'isMarried',
                key: 'isMarried',
                render(state) {
                    return state === 1 ? '是' : '否'
                }
            },
            {
                title: '生日',
                width: 150,
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '地址',
                width: 150,
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '起床时间',
                width: 120,
                fixed: 'right',
                dataIndex: 'time',
                key: 'time',
            }
        ]
        const columns3 = [
            {
                title: 'id',
                width: 80,
                dataIndex: 'id',
                key:'id'
            },
            {
                title: '用户名',
                width: 80,
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '性别',
                width: 80,
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                width: 80,
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                width: 120,
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
                width: 120,
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
                width: 120,
                dataIndex: 'isMarried',
                key: 'isMarried',
                render(state) {
                    return state === 1 ? '是' : '否'
                }
            },
            {
                title: '生日',
                width: 120,
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
                width: 120,
                dataIndex: 'time',
                key: 'time',
            }
        ]
        const columns4 = [
            {
                title: 'id',
                width: 80,
                dataIndex: 'id',
                key:'id'
            },
            {
                title: '用户名',
                width: 80,
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '性别',
                width: 80,
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                width: 80,
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '状态',
                width: 120,
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
                width: 120,
                dataIndex: 'interest',
                key: 'interest',
                render(state) {
                    let config = {
                        "1": <Badge status="success" text="打篮球-成功" />,
                        "2": <Badge status="error" text="踢足球-错误" />,
                        "3": <Badge status="default" text="羽毛球-正常" />,
                        "4": <Badge status="processing" text="电竞-进行" />,
                        "5": <Badge status="warning" text="浪" />
                    }
                    return config[state]
                }
            },
            {
                title: '是否已婚',
                width: 120,
                dataIndex: 'isMarried',
                key: 'isMarried',
                render(state) {
                    return state === 1 ? '是' : '否'
                }
            },
            {
                title: '生日',
                width: 120,
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
                width: 120,
                dataIndex: 'time',
                key: 'time',
            }
        ]
        const columns5 = [
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
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
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
                        "1": <Badge status="success" text="打篮球-成功" />,
                        "2": <Badge status="error" text="踢足球-错误" />,
                        "3": <Badge status="default" text="羽毛球-正常" />,
                        "4": <Badge status="processing" text="电竞-进行" />,
                        "5": <Badge status="warning" text="浪" />
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
            },
            {
                title: '操作',
                render:(text, item) => {
                    return <Button size="small" onClick={()=> {this.handleDelete2(item)}}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card title="Mock-头部固定表格">
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
                        scroll={{y: 240}}
                    />
                </Card>
                <Card title="Mock-侧栏固定表格">
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
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{x: 1250}}
                    />
                </Card>
                <Card title="Mock-年龄排序">
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
                        columns={columns3}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{y: 240}}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="Mock-Badge徽标">
                    <Table 
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => { // 点击行
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        columns={columns4}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{y: 240}}
                    />
                </Card>
                <Card title="Mock-删除">
                    <Table 
                        columns={columns5}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{y: 240}}
                    />
                </Card>
            </div>
        )
    }
}