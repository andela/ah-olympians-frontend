import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';

import { fetchArticle } from '../../actions/postArticles';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import '../../App.scss';
import './Articles.scss';

const readingTime = require('reading-time');


export class GetArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anArticle: [],
      currentUser: {},
    };
    this.onClick = this.onClick.bind(this);
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

  render() {
    const { currentUser, loggedIn } = this.props;
    let articleBody = false;
    let articleTitle;
    let articleThisOne;
    let articleAuthor;
    let articleDesc;
    let articleTags;
    let articleReadTime = {};
    const articleObject = this.state.anArticle;
    let articleDate;
    let tagItems = [];

    if (articleObject != false) {
      articleBody = parse(articleObject[0].body);
      articleTitle = this.state.anArticle[0].title;
      articleThisOne = parse(this.state.anArticle[0].body);
      articleAuthor = this.state.anArticle[0].author.username;
      articleDesc = this.state.anArticle[0].description;
      articleTags = this.state.anArticle[0].tag_list;
      articleDate = this.state.anArticle[0].created_at.substr(0, this.state.anArticle[0].created_at.indexOf('T'));
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
          <i className="fas fa-tags"></i>
          <span>{tagItem}</span>
        </div>
      ));
    } catch (e) {
    }
    return (
      <div className="App-header">
        <header>
          <NavbarInstance />
        </header>
        <div className="article-container">
          <Container>
            <Row className="justify-content-md-center draw-line-horizontal">
              <h1>
                <strong>
                  { articleTitle }
                </strong>
              </h1>
            </Row>
          </Container>
          <Container>
            <Row className="justify-content-md-center">
              <Col className="draw-line-vertical" sm={2}>
                <div className="sidebar">
                  <i className="fas fa-user"></i>
                  <strong> By </strong>
                  {articleAuthor}
                </div>
                <br />
                <div className="sidebar">
                  <i className="fas fa-list"></i>
                  <strong> Description: </strong>
                  {articleDesc}
                </div>
                <br />
                <div className="sidebar">
                  <i className="far fa-calendar-alt"></i>
                  <strong> Published: </strong>
                  {articleDate}
                </div>
                <br />
                <div className="sidebar">
                  <i className="fas fa-eye"></i>
                  <span>
                    {articleReadTime}
                  </span>
                </div>
                <br />
                <div className="sidebar">
                  <h5>Tags</h5>
                  {tagItems}
                </div>
                <br />
                <div>
                  {loggedIn ?(
                  <div>
                    {currentUser.user.username===articleAuthor ?(
                    <button type="button" class="btn btn-primary btn-sm" onClick={this.onClick}>Edit Article</button>
                    ): (
                    ''
                    )}
                  </div>
                   ): (
                   ''
                   )}
                </div>
              </Col>
              <Col sm={10} className="view-font">
                <div className="image-wrapper">
                  { articleThisOne }
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
  currentUser: PropTypes.object,
};

const mapStateToProps = state => ({
  anArticle: state.articles.item,
  currentUser: state.login.user,
  loggedIn: state.login.loggedIn,
  errors: state.articles.errors,
});


export default connect(mapStateToProps, { fetchArticle })(GetArticle);
