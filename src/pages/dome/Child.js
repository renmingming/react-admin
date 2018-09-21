import React from 'react'

export default class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    componentWillMount() {
        // render 之前
        console.log('will mount')
    }

    componentDidMount() {
        // render之后，不回立即调用，所有子组件都render之后
        console.log('did mount')
    }

    componentWillReceiveProps(newProps) {
        // 组件传值是调用
        console.log('will props' + newProps.name)
    }

    shouldComponentUpdate() {
        console.log('should update')
        return true;
    }

    componentWillUpdate() {
        console.log('will update')
    }

    componentDidUpdate() {
        console.log('did update')
    }

    render() {
        return (
            <div>{this.props.name}</div>
        )
    }
}