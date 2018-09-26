import React from 'react'
import {Card, Table} from 'antd'
import axios from 'axios'

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
    request = () => {
        let baseUrl = 'https://www.easy-mock.com/mock/5bab71e33567340cc7d3dc66/rmmapi';
        axios.get(baseUrl + '/table/list').then((res) => {
            if(res.status === 200) {
                this.setState({
                    dataSource2: res.data.result.list
                })
            }
        })
    }
    render() {
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
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                key: 'interest',
            },
            {
                title: '是否已婚',
                dataIndex: 'isMarried',
                key: 'isMarried',
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
                <Card title="动态数据渲染表格">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
            </div>
        )
    }
}