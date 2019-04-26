import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Container,
  Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import CommentBox from './commentBox';
import CommentList from './commentList';
import { fetchArticleComments } from '../../actions/index';
import './style/comments.scss';

class CommentsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: props.article,
    };
  }

  componentWillMount() {
    const { getComments, article } = this.props;
    getComments(article);
  }

  render() {
    const { article } = this.state;
    const { commentsCount, loggedIn } = this.props;
    return (
      <div>
        <Container>
          {
            (loggedIn)
              ? (
                <Row>
                  <Col sm={4}>
                    <Form.Label className="dark-label" column sm={12}>
                      Add comment
                    </Form.Label>
                    <CommentBox inputValue="" article={article} editBox={false} />
                  </Col>
                  <Col sm={8} />
                </Row>
              )
              : ('')
          }
          <Row>
            <Col sm={12}>
              <div className="card card-body bg-light">
                <h2 className="page-header text-white">
                  Comments &nbsp; (
                  { commentsCount }
                  )
                </h2>
                <CommentList article={article} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

CommentsComponent.propTypes = {
  article: PropTypes.string.isRequired,
  getComments: PropTypes.func.isRequired,
  commentsCount: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getComments: slug => dispatch(fetchArticleComments(slug)),
});

const mapStateToProps = state => ({
  commentsCount: state.comments.comments.commentsCount,
  loggedIn: state.login.loggedIn,
});

const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsComponent);

export default Comments;
