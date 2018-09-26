import React from 'react'
import {Card, Tabs, message, Icon} from 'antd'
const TabPane = Tabs.TabPane
export default class Tab extends React.Component{
    constructor(props) {
        super(props)
        this.newTabIndex = 0;
        const panes = [
            {
                title: 'Tab 1',
                content: 'Content of Tab1',
                key: '1'
            },{
                title: 'Tab 2',
                content: 'Content of Tab2',
                key: '2'
            },{
                title: 'Tab 3',
                content: 'Content of Tab3',
                key: '3',
                closable: false
            }
        ]
        this.state = {
            panes,
            activekey: panes[0].key
        }
    }
    handleCallback = (key) => {
        message.info(`你选择的key是：${key}`)
    }
    componentWillMount() {
    }
    onChange = (activekey) => {
        this.setState({
            activekey
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
      }
    
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }
    
    remove = (targetKey) => {
        // targetKey删除的key
        // activeKey当前的key
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    render() {
        return(
            <div>
                <Card title="tab标签切换">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2">Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="tab标签切换Icon">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">Tab Pane 1</TabPane>
                        <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2">Tab Pane 2</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="tab新增关闭页签">
                    <Tabs 
                        activekey={this.state.activekey}
                        type="editable-card"
                        onChange={this.onChange}
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map((pane) =>
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>
                        )}
                    </Tabs>
                </Card>
            </div>
        )
    }
}