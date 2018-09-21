import React from 'react'
import Child from './Child'
import { Button } from 'antd'
import './life.scss'

class Life extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		}
	}
	handleAdd = () => {
		this.setState({
			count: this.state.count+1
		})
	}
	render() {
		return (
			<div className="app">
				<h1>生命周期介绍</h1>
				<Button onClick={this.handleAdd}>点击一下antd</Button>
				<button onClick={this.handleAdd}>点击一下</button>
				<p>{this.state.count}</p>
				<Child name={this.state.count}></Child>
			</div>
			)
	}
}

export default Life;