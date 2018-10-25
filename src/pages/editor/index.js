import React from 'react'
import {Button,Card} from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'
import {EditorWrapper} from './style'

export default class RichText extends React.Component{

    state = {
        editorContent: '',
        editorState: '',
    };

    handleClearContent = ()=>{
        this.setState({editorState:'', editorContent: ''})
    }

    onEditorChange = (editorContent) => {
        this.setState({editorContent});
    };

    onEditorStateChange = (editorState) => {
        this.setState({editorState});
    };

    render(){
        const { editorContent, editorState } = this.state;
        return (
            <EditorWrapper>
                <Card title="预览">
                    <div
                        dangerouslySetInnerHTML={{__html: draftjs(editorContent)}} >
                    </div>
                </Card>
                <Card title={<Button type="primary" onClick={this.handleClearContent}>清空内容</Button>}>
                    <Editor
                        editorState={editorState}
                        placeholder="请输入正文~~~"
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange} >
                    </Editor>
                </Card>
            </EditorWrapper>
        );
    }
}