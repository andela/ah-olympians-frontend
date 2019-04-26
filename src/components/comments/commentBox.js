import React, { Component } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CommentOnArticle, CommentOnComment, editComment } from '../../actions/index';

class BoxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: props.article,
      commentId: props.commentId,
      editBox: props.editBox,
      inputValue: props.inputValue,
      inputError: '',
    };
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  };

  handleSubmit = event => {
    const { articleComment, commentComment, updateComment} = this.props;
    const { inputValue, article, commentId, editBox} = this.state;
    const form = event.currentTarget;
    if (!form.checkValidity() || !this.state.inputValue) {
      this.setState({ inputError: 'Fill in comment box' });
      event.stopPropagation();
    } else {
      if (editBox) {
        updateComment(article, commentId, { body: inputValue })
      } else if (commentId) {
        commentComment(article, commentId, { body: inputValue })
        this.setState({ inputValue: '' });
      } else {
        articleComment(article, { body: inputValue });
        this.setState({ inputValue: '' });
      }

      this.setState({ inputError: '' });
    }
    event.preventDefault();
  };

  render() {
    let { inputError, inputValue } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="body">
            <Col sm={12}>
              <Form.Control
                as="textarea"
                rows="3"
                name="body"
                placeholder="Type Comment"
                value={inputValue}
                onChange={this.handleChange}
              />
              <div className="text-danger">{inputError}</div>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col />
            <Col />
            <Col>
              <button className="btn btn-success" variant="info">
                Comment
              </button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

BoxComponent.propTypes = {
  articleComment: PropTypes.func.isRequired,
  commentComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  articleComment: (slug, comment) => dispatch(CommentOnArticle(slug, comment)),
  commentComment: (slug, commentId, comment) => dispatch(CommentOnComment(slug, commentId, comment)),
  updateComment: (slug, commentId, comment) => dispatch(editComment(slug, commentId, comment)),
});

const CommentBox = connect(
  null,
  mapDispatchToProps,
)(BoxComponent);

export default CommentBox;
