import React from 'react'
import {Button, Card, Modal, Form, Input,message, Select, Tree, Transfer} from 'antd'
import Utils from '../../utils/utils.js'
import axios from '../../axios/index.js'
import ETable from '../../components/ETable/index.js'
import menuConfig from '../../config/menuConfig.js'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode

export default class permissionUser extends React.Component{
    state = {
        selectedRowKeys: null,
        createRoleVisible: false
    }
    params = {
        page: 1
    }
    componentWillMount() {
        this.requestList();
    }
    requestList() {
        axios.requestList(this, '/role/list', this.params)
    }
    // 创建提交
    handleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        console.log(data)
        axios.ajax({
            url: 'role/create',
            data: {
                params: data
            }
        }).then(res => {
            if(res.code === 0){
                this.setState({
                    createRoleVisible:false
                })
                message.success(`角色：${data.role_name}创建成功`)
                this.roleForm.props.form.resetFields();
                this.requestList()
            }
        })
    }
    handlePermEditSubmit = () => {
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: '/role/edit',
            data: {
                params: data
            }
        }).then(res => {
            if(res.code === 0) {
                this.setState({
                    isPermVisible: false
                })
                message.success(`设置成功`)
                this.permForm.props.form.resetFields();
            }
        })
    }
    // 打开创建
    handleCreateRole = () => {
        this.setState({
            createRoleVisible: true
        })
    }
    // 权限设置
    handlePermission = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                title: '提示',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            dataitem: item,
            menuInfo: item.menus
        })
    }
    // 用户权限
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                title: '提示',
                content: '请选择一个角色'
            })
            return;
        }
        this.getRoleUserList(item)
    }
    getRoleUserList = (item) => {
        axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id:item.id
                }
            }
        }).then(res => {
            if(res.code === 0) {
                this.setState({
                    isUserVisible: true,
                    detailInfo: item
                })
                this.getAuthUserList(res.result)
            }
        })
    }
    // 帅选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = []
        const targetKeys = []
        if(dataSource && dataSource.length > 0) {
            for(let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id.toString(),
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if(data.status === 1) {
                    // targetKeys为key 的集合
                    targetKeys.push(data.key);
                }
                mockData.push(data); // 全数据，自动率选去掉右边的数据
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }
    // 用户授权提交
    handleUserSubmit = () => {
        let data = {};
        data.user_ids = this.state.targetKeys;
        // 角色id
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url: '/role/user_role_edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            if(res.code === 0) {
                this.setState({
                    isUserVisible: false
                })
                message.success(`角色：${this.state.selectedItem.role_name}，用户授权成功`)
                this.requestList()
            }
        }) 
    }
    render() {
        const columns = [
            {
                title:' 角色ID',
                dataIndex: 'id'
            },{
                title: '角色名称',
                dataIndex: 'role_name'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formteDate
            },{
                title: '使用状态',
                dataIndex: 'status',
                render: (status) => {
                    return status === 1 ? '授权' : '未授权'
                }
            },{
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formteDate
            },{
                title: '授权人',
                dataIndex: 'authorize_user_name'
            }
        ]
        return(
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleCreateRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户权限</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.createRoleVisible}
                    onCancel={() => {
                        this.setState({
                            createRoleVisible: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <RoleForm wrappedComponentRef={(inst) => {this.roleForm = inst}}/>
                </Modal>
                <Modal 
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible:false
                        })
                    }}
                    >
                    <PermEditForm 
                        wrappedComponentRef={(inst) => {this.permForm = inst}}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                        menuInfo={this.state.menuInfo}
                        detailInfo={this.state.selectedItem} />
                </Modal>
                <Modal
                    title="用户授权"
                    width={800}
                    visible={this.state.isUserVisible}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                    onOk={this.handleUserSubmit}
                >
                    <RoleAuthForm 
                        wrappedComponentRef={(inst) => {this.userAuthForm = inst}}
                        mockData={this.state.mockData}
                        targetKeys={this.state.targetKeys}
                        detailInfo={this.state.detailInfo}
                        patchUserInfo={(targetKeys) => {
                            this.setState({
                                targetKeys
                            })
                        }}
                         />
                </Modal>
            </div>
        )
    }
}

class RoleForm extends React.Component{
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator('role_name')(
                        <Input type="text" placeholder="请输入角色名称" />
                    )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator('status')(
                        <Select>
                            <Option value="0">关闭</Option>
                            <Option value="1">开启</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create()(RoleForm);

class PermEditForm extends React.Component{
    renderTreeNode = (data) => {
        return data.map((item) => {
            if(item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNode(item.children)}
                </TreeNode>
            }else{
                return <TreeNode {...item} />
            }
        })
    }
    onCheck = (checkedKeys) => {
        console.log(checkedKeys)
        this.props.patchMenuInfo(checkedKeys)
    }
    render() {
        let detailInfo = this.props.detailInfo;
        let menuInfo = this.props.menuInfo;
        console.log(menuInfo)
        const {getFieldDecorator} = this.props.form;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称">
                    <Input disabled placeholder={detailInfo.role_name}/>
                </FormItem>
                <FormItem label="状态">
                    {
                        getFieldDecorator('status',{
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="1">开启</Option>
                                <Option value="0">关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll // 默认全部展开
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNode(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create()(PermEditForm)

class RoleAuthForm extends React.Component{
    onCheck = (checkedKeys) => {
        console.log(checkedKeys)
        // this.props.patchMenuInfo(checkedKeys)
    }
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys)
    }
    render() {
        let detailInfo = this.props.detailInfo;
        const locale = {
            itemUnit: '项',
            itemsUnit: '项',
            notFoundContent: '列表为空',
            searchPlaceholder: '请输入搜索内容'
        }
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol: {
                span: 19
            }
        }
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.role_name}/>
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        listStyle={{width:200, height:400}}
                        dataSource={this.props.mockData}
                        titles={['待选用户','已选用户']}
                        showSearch
                        locale={locale}
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create()(RoleAuthForm)