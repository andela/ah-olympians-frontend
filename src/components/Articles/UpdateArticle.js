import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { WithContext as ReactTags } from 'react-tag-input';
import { Container } from 'react-bootstrap';

import { editArticle } from '../../actions/editArticle';
import { fetchArticle } from '../../actions/postArticles';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../App.scss';


export class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      tags: [],
      editorState: EditorState.createEmpty(),
      errors: '',
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchArticle(slug);
  }

  componentWillReceiveProps(nextProps) {
    try {
      let articles = [];
      articles.push(nextProps.articleToUpdate.article);
      articles = articles[0];
      const tagList = articles.tag_list;
      const tags = tagList.map(x => ({
        id: x,
        text: x,
      }));
      const articleBody = articles.body;
      const contentBlock = htmlToDraft(articleBody);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);

      this.setState({
        title: articles.title,
        tags: tags,
        description: articles.description,
        editorState,
      });
    } catch (e) {
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const slug = this.props.match.params.slug;
    const items = this.state.tags;
    const tagNames = items.map(function (item) {
      return item.text;
    });

    const post = {
      title: this.state.title,
      description: this.state.description,
      body: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      tag_list: tagNames,
    };

    this.props.editArticle(slug, post);
    this.props.history.push(`/article/${slug}`);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
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
              <input type="email" name="title" className="form-control" onChange={this.onChange} aria-describedby="emailHelp" value={this.state.title} />
              <label htmlFor="exampleTextarea">Description</label>
              <textarea className="form-control" id="exampleTextarea" name="description" onChange={this.onChange} rows="3" placeholder="Enter short description of your article" value={this.state.description} />
              <label htmlFor="exampleInputEmail1">Tags</label>
              <ReactTags
                id="tag-editor"
                tags={tags}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
              />
            </div>
            <Editor
              editorState={editorState}
              editorStyle={editorStyle}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
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


EditArticle.propTypes = {
  editArticle: PropTypes.func.isRequired,
  fetchArticle: PropTypes.func.isRequired,
  articleToUpdate: PropTypes.object,
  updatedArticle: PropTypes.object,
};

const mapStateToProps = state => ({
  articleToUpdate: state.articles.item,
  updatedArticle: state.articles.updated_item,
});

export default connect(mapStateToProps, { fetchArticle, editArticle })(EditArticle);
