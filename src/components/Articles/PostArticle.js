import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { Container } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';

import { createArticle } from '../../actions/postArticles';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../App.scss';
import './tags.css';


export class PostArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: EditorState.createEmpty(),
      tags: [],
      description: '',
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newArticle) {
      nextProps.history.push(`/article/${nextProps.newArticle.article.slug}`);
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const tagItems = this.state.tags;
    const names = tagItems.map(function (tagItem) {
      return tagItem.text;
    });
    const post = {
      title: this.state.title,
      description: this.state.description,
      body: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      tag_list: names,
    };

    this.props.createArticle(post);
  }

  uploadImageCallBack(file) {
    try {
      const url = 'https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/duqtwq297/image/upload';
      const formData = new FormData();
      const headers = { 'Content-Type': 'application/x-wwww-form-urlencoded' };
      formData.append('file', file);
      formData.append('upload_preset', 'rachelle');
      return axios.post(url, formData, { headers });
    } catch (err) {
      return err;
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: Array(event.target.value),
    });
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  }

  render() {
    const { editorState, tags } = this.state;
    const editorStyle = {
      border: '1px solid black',
      padding: '5px',
      borderRadius: '2px',
      fontSize: '18px',
      height: '300px',
      width: '100%',
    };
    return (
      <div className="App-header">
        <header>
          <NavbarInstance />
        </header>
        <div>
          <Container className="container-height" id="this-container" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              <input type="email" name="title" className="form-control" onChange={this.onChange} aria-describedby="emailHelp" placeholder="Enter title of article" value={this.state.title} />
              <label htmlFor="exampleTextarea">Description</label>
              <textarea className="form-control" id="exampleTextarea" name="description" onChange={this.onChange} rows="3" placeholder="Enter short description of your article" value={this.state.description} />
              <label htmlFor="exampleInputEmail1">Tags</label>
              <ReactTags
                tags={tags}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
              />
            </div>
            <Editor
              initialEditorState={editorState}
              placeholder="Start typing your article here..."
              toolbarClassName="toolbarClassName"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorStyle={editorStyle}
              onEditorStateChange={this.onEditorStateChange}
              hashtag={{
                separator: ' ',
                trigger: '#',
              }}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                inline: {
                  options: ['bold', 'italic', 'underline'],
                },
                image: {
                  uploadCallback: this.uploadImageCallBack,
                  previewImage: true,
                  alt: {
                    present: true,
                    mandatory: true,
                  },
                },
              }}
            />
            <button className="btn btn-success" type="submit" onClick={this.onSubmit}>Publish</button>
            <br />
          </Container>
        </div>
        <br />
        <div className="footer-space" />
        <Footer />
      </div>
    );
  }
}

PostArticle.propTypes = {
  createArticle: PropTypes.func,
  newArticle: PropTypes.object,
};

const mapStateToProps = state => ({
  newArticle: state.articles.item,
});

export default connect(mapStateToProps, { createArticle })(PostArticle);
