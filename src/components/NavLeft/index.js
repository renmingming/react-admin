import React from 'react'
import {NavLink} from 'react-router-dom'
import MenuConfig from './../../config/menuConfig'
import {connect} from 'react-redux' // 连接器redux和组件链接
import {switchMenu} from './../../redux/action'
import './index.scss'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component{
    state = {
        currentKey: ''
    }
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        let url = window.location.hash;
        let currentKey = url.replace(/#|\?.*$/g, '')
        this.setState({
            menuTreeNode,
            currentKey
        })
    }
    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if(item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }
    handleClick = ({item, key}) => {
        const {dispatch} = this.props; // 通过connect链接才能取到
        dispatch(switchMenu(item.props.children.props.children))
        this.setState({
            currentKey: key
        })
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo.svg" alt="" />
                    <h1>RMM MS</h1>
                </div>
                <Menu 
                    onClick={this.handleClick}
                    selectedKeys={[this.state.currentKey]} mode="vertical" theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

export default connect()(NavLeft);