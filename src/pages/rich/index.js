import React from 'react'
import {Button,Card,Modal} from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'

export default class RichText extends React.Component{
    state = {
        showRichText: false,
        editorState: '',
        editorContent: ''
    }
    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }
    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }
    onEditorChange = (editorContent) => {
        this.setState({
            editorContent
        })
    }
    render() {
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor 
                        editorState={this.state.editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本HTML"
                    visible={this.state.showRichText}
                    onCancel={() => {
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.editorContent)}
                </Modal>
            </div>
        )
    }
} 