import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Row, Col, Image } from 'react-bootstrap';
import { UncontrolledCollapse } from 'reactstrap';
import CommentBox from './commentBox';
import './style/comments.scss';

class CommentMedia extends Component {
  constructor(props) {
    super();
    this.state = {
      article: props.article,
    };
  }

  render() {
    const { article } = this.state;
    const { articleComments, localUser, loggedIn } = this.props;
    return Object.keys(articleComments).map(key => (
      <div key={key} className="media mt-3">
        <Image
          src={`https://res.cloudinary.com/jumakahiga/${
            articleComments[key].author.image
          }`}
          alt="IMG"
          className="rounded-circle mr-2"
        />
        <div className="media-body">
          <h6 className="mt-0">
            <strong>
              <i>{articleComments[key].author.username}</i>
            </strong>
            &nbsp;
            <Moment format="YYYY/MM/DD HH:mm">
              {articleComments[key].createdAt}
            </Moment>
          </h6>
          {articleComments[key].body}
          <br />
          <button
            type="button"
            id={`edit_${articleComments[key].id}`}
            className={`btn btn-link ${
              ((localUser.username === articleComments[key].author.username) && loggedIn) ? '' : 'd-none'
            }`}
          >
            edit
          </button>
          <button
            type="button"
            id={`comment_${articleComments[key].id}`}
            className={`btn btn-link ${
              loggedIn ? '' : 'd-none'
            }`}
          >
            comment
          </button>
          <button
            type="button"
            id={`comments_${articleComments[key].id}`}
            className={`btn btn-link ${
              (articleComments[key].subcomments).length > 0 ? '' : 'd-none'
            }`}
          >
            comments
          </button>
          <UncontrolledCollapse toggler={`#edit_${articleComments[key].id}`}>
            <Row>
              <Col sm={4}>
                <CommentBox
                  inputValue={articleComments[key].body}
                  article={article}
                  commentId={articleComments[key].id}
                  editBox
                />
              </Col>
              <Col sm={8} />
            </Row>
          </UncontrolledCollapse>
          <UncontrolledCollapse toggler={`comment_${articleComments[key].id}`}>
            <Row>
              <Col sm={4}>
                <CommentBox
                  inputValue=""
                  article={article}
                  commentId={articleComments[key].id}
                  editBox={false}
                />
              </Col>
              <Col sm={8} />
            </Row>
          </UncontrolledCollapse>
          <UncontrolledCollapse toggler={`comments_${articleComments[key].id}`}>
            {Object.keys(articleComments[key].subcomments).map(sub => (
              <div key={sub} className="media mt-3">
                <Image
                  src={`https://res.cloudinary.com/jumakahiga/${
                    articleComments[key].subcomments[sub].author.image
                  }`}
                  alt="IMG"
                  className="rounded-circle mr-2"
                />
                <div className="media-body">
                  <h6 className="mt-0">
                    <strong>
                      <i>{articleComments[key].subcomments[sub].author.username}</i>
                    </strong>
                    &nbsp;
                    <Moment format="YYYY/MM/DD HH:mm">
                      {articleComments[key].subcomments[sub].createdAt}
                    </Moment>
                  </h6>
                  {articleComments[key].subcomments[sub].body}
                  <br />
                  {localUser.username
                  === articleComments[key].subcomments[sub].author.username ? (
                    <button
                      type="button"
                      id={`edit_${articleComments[key].subcomments[sub].id}`}
                      className="btn btn-link"
                    >
                      edit
                    </button>
                    ) : (
                      ''
                    )}
                  <UncontrolledCollapse
                    toggler={`#edit_${articleComments[key].subcomments[sub].id}`}
                  >
                    <Row>
                      <Col sm={4}>
                        <CommentBox
                          inputValue={articleComments[key].subcomments[sub].body}
                          commentId={articleComments[key].subcomments[sub].id}
                          editBox
                        />
                      </Col>
                      <Col sm={8} />
                    </Row>
                  </UncontrolledCollapse>
                </div>
              </div>
            ))}
          </UncontrolledCollapse>
        </div>
      </div>
    ));
  }
}

CommentMedia.propTypes = {
  articleComments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  localUser: PropTypes.shape({}).isRequired,
  article: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  articleComments: state.comments.comments.comments,
  localUser: state.login.user,
  loggedIn: state.login.loggedIn,
});

const CommentList = connect(mapStateToProps)(CommentMedia);

export default CommentList;
