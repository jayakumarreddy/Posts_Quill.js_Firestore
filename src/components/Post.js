import React, { Component } from 'react';
import ReactQuill,{ Quill } from 'react-quill';
import * as ReactBootstrap from 'react-bootstrap';
import { connect } from 'react-redux';
import { addPost } from '../actions/post';

class Post extends Component {

  constructor(props){
    super(props);
    this.state={
      title: '',
      body : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeQuill=this.handleChangeQuill.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      title : e.target.value
    })
  }

  handleChangeQuill(value){
    this.setState({
      body:value
    })
  }
  handleSubmit(e){
    this.props.dispatch(addPost(this.state))
    // console.log('post',this.props.post)
  }
  
  render() {
    return (
      <div className='post-form'>
      {this.props.post.posted &&  <ReactBootstrap.Alert bsStyle='warning'><strong>Alert!</strong>Posted Successfully...</ReactBootstrap.Alert>}
      {this.props.post.postfailed &&  <ReactBootstrap.Alert bsStyle='warning'><strong>Alert!</strong>Posting failed...</ReactBootstrap.Alert>} 
        
        <form>
           <ReactBootstrap.ControlLabel>Title</ReactBootstrap.ControlLabel><br/>
           <ReactBootstrap.FormControl
            placeholder="Enter the title of the Post.."
            value={this.state.title}
            onChange={this.handleChange}
            />
            <br/>
            <ReactQuill
              value={this.state.body}
              onChange={this.handleChangeQuill}
              modules={Editor.modules}
              formats={Editor.formats}
              placeholder="Enter full post here.."
            /> 
            {this.props.post.postingRequested ? 
              <ReactBootstrap.Button  bsStyle="primary">Posting....</ReactBootstrap.Button>         
             :
             <ReactBootstrap.Button  bsStyle="primary" onClick={this.handleSubmit}>Post</ReactBootstrap.Button>        
             }
        </form> 

        <div dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        
      </div>
    )
  }
}

const Editor={};
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'},{'header': '3'}, { 'font': [] },{ 'color': [] }, { 'background': [] }],
    [{size: []}],
    [{ 'script': 'sub'}, { 'script': 'super' }], 
    ['bold', 'italic', 'underline', 'strike', 'blockquote','code-block'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size','color','background','script',
  'bold', 'italic', 'underline', 'strike', 'blockquote','code-block',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

function mapStateToProps(state){
  return {
    post : state.post
  }
}

export default connect(mapStateToProps)(Post);
