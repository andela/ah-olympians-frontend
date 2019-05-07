import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import parse from 'html-react-parser';

import { fetchArticle } from '../../actions/postArticles';
import { reportArticle } from '../../actions/reportArticle';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import '../../App.scss';
import './Articles.scss';
import ArticleLiking from '../LikeDislikeArticle/like.dislike';
import SocialShare from '../SocialShare/index';

const readingTime = require('reading-time');

export class GetArticle extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      anArticle: [],
      currentUser: {},
      modalShow: false,
      emptyForm: false,
      erros: [],
      errorsFound: false,
      wasSuccessful: false,
      successMessage: {},
    };
    this.onClick = this.onClick.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchArticle(slug);
  }

  componentWillReceiveProps(newProps) {
    const slug = newProps.match.params.slug;
    if (newProps.errors.length>0) {
      this.props.history.push(`/article/${slug}/404`)
    } else{
      const articles = [];
      const activeUser = [];
      articles.push(newProps.anArticle.article);
      activeUser.push(newProps.currentUser);
      this.setState({
        anArticle: articles,
        currentUser: activeUser[0],
      });
    }
  }

  onClick(event) {
    event.preventDefault();
    const slug = this.props.match.params.slug;
    this.props.history.push(`/article/${slug}/edit`);
  }

  handleClose() {
    this.setState({ modalShow: false });
  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  onChange(event) {
    this.setState({
      reportMessage: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const theMessage = this.state.reportMessage;
    if (theMessage !== undefined) {
      const slug = this.props.match.params.slug;
      const post = {
        report_message: theMessage,
      };

      this.props.reportArticle(slug, post);

    } else {
      this.setState({
        emptyForm: true,
      });
    }
  }


  render() {
    const { currentUser, loggedIn, errorsFound, errors, wasSuccessful, successMessage } = this.props;
    const { emptyForm } = this.state;
    let articleBody = false;
    let articleTitle;
    let articleThisOne;
    let articleAuthor;
    let articleDesc;
    let articleTags;
    let articleSlug;
    let articleReadTime = {};
    const articleObject = this.state.anArticle;
    let articleDate;
    let tagItems = [];

    if (articleObject != false) {
      articleBody = parse(articleObject[0].body);
      articleTitle = this.state.anArticle[0].title;
      articleSlug = this.state.anArticle[0].slug;
      articleThisOne = parse(this.state.anArticle[0].body);
      articleAuthor = this.state.anArticle[0].author.username;
      articleDesc = this.state.anArticle[0].description;
      articleTags = this.state.anArticle[0].tag_list;
      articleDate = this.state.anArticle[0].created_at.substr(
        0,
        this.state.anArticle[0].created_at.indexOf('T'),
      );
      articleReadTime = readingTime(this.state.anArticle[0].body).text;
    }

    if (articleObject.length === 0) {
      return (
        <div className="App-header">
          <header>
            <NavbarInstance />
          </header>
          <h3>Loading...</h3>
        </div>
      );
    }
    try {
      tagItems = articleTags.map(tagItem => (
        <div>
          <i className="fas fa-tags" />
          <span>{tagItem}</span>
        </div>
      ));
    } catch (e) {}
    return (
      <div className="App-header">
        <header>
          <NavbarInstance />
        </header>
        <div className="article-container">
          <Container>
            <Row className="justify-content-md-center draw-line-horizontal">
              <h1>
                <strong>{articleTitle}</strong>
              </h1>
            </Row>
          </Container>
          <Container>
            <Row className="justify-content-md-center">
              <Col className="draw-line-vertical" sm={2}>
                <div className="sidebar">
                  <i className="fas fa-user" />
                  <strong> By </strong>
                  {articleAuthor}
                </div>
                <br />
                <div className="sidebar">
                  <i className="fas fa-list" />
                  <strong> Description: </strong>
                  {articleDesc}
                </div>
                <br />
                <div className="sidebar">
                  <i className="far fa-calendar-alt" />
                  <strong> Published: </strong>
                  {articleDate}
                </div>
                <br />
                <div className="sidebar">
                  <i className="fas fa-eye" />
                  <span>{articleReadTime}</span>
                  <br />
                  <br />
                  <SocialShare title={articleTitle} slug={articleSlug} />
                </div>
                <br />
                <div className="sidebar">
                  <h5>Tags</h5>
                  {tagItems}
                </div>
                <br />

                <br />
                <div>
                  {loggedIn ? (
                    <div>
                      {currentUser.user.username === articleAuthor ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={this.onClick}
                        >
                          Edit Article
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : ('')}
                  {loggedIn ?(
                    <div>
                    {currentUser.user.username!==articleAuthor ?(
                      <div>
                      <button type="button" className="btn btn-outline-warning btn-sm" onClick={this.handleShow}>Report Article</button>
                      <Modal show={this.state.modalShow} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Report</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div class="form-group">
                          <div class="custom-control custom-radio">
                            <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" onChange={this.onChange} value="This article is abusive" />
                            <label class="custom-control-label" for="customRadio3">This article is abusive</label>
                          </div>
                          <div class="custom-control custom-radio">
                            <input type="radio" id="customRadio5" name="customRadio" class="custom-control-input" onChange={this.onChange} value="This article maliciously defames an individual, group or entity"/>
                            <label class="custom-control-label" for="customRadio5">This article maliciously defames an individual, group or entity</label>
                          </div>
                          <div class="custom-control custom-radio">
                            <input type="radio" id="customRadio4" name="customRadio" class="custom-control-input" onChange={this.onChange} value="This article is plagiarized" />
                            <label class="custom-control-label" for="customRadio4">This article is plagiarized</label>
                          </div>
                          <div class="custom-control custom-radio">
                            <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" onChange={this.onChange} value="This article propagates fake news" />
                            <label class="custom-control-label" for="customRadio2">This article propagates fake news</label>
                          </div>
                          <div id="error-message"><br />
                            {emptyForm ?(
                              <p class="text-warning">Please choose one option to proceed</p>
                              ): ('')}
                          </div>
                          <div id="error-message"><br />
                            {errorsFound ?(
                              <p class="text-warning">{errors.errors}</p>
                              ): ('')}
                          </div>
                          <div id="success-message"><br />
                            {wasSuccessful ?(
                              <p class="text-success">Your report has been sent successfully to the admin. Click Close below</p>
                              ): ('')}
                          </div>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={this.handleClose}>
                            Close
                          </Button>
                          <Button variant="success" onClick={this.onSubmit}>
                            Submit Report
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      </div>
                      ): ('')}
                    </div>
                  ): ('')}
                </div>
              </Col>
              <Col sm={10} className="view-font">
                <div className="image-wrapper">{articleThisOne}</div>
                <div className="liking">
                  <ArticleLiking slug={this.props.match.params.slug} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <br />
        <div className="footer-space" />
        <Footer />
      </div>
    );
  }
}

GetArticle.defaultProps = {
  currentUser: {},
  loggedIn: false,
};

GetArticle.propTypes = {
  fetchArticle: PropTypes.func.isRequired,
  reportArticle: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = state => ({
  anArticle: state.articles.item,
  currentUser: state.login.user,
  loggedIn: state.login.loggedIn,
  errors: state.articles.errors,
  errorsFound: state.articles.errorsFound,
  successMessage: state.articles.successMessage,
  wasSuccessful: state.articles.wasSuccessful,
});

export default connect(mapStateToProps, { fetchArticle, reportArticle })(GetArticle);