import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardColumns,
  Carousel,
  Container,
  Image,
  Row,
} from 'react-bootstrap';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import coffee from './img/coffee.jpg';
import create from './img/create.jpg';
import notebook from './img/notebook.jpg';
import { getArticles } from '../../actions/getArticles';
import './Home.scss';
import '../../App.scss';
import '../../css/bootstrap.min.css';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentWillMount() {
    this.props.getArticles();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      articles: newProps.articles.articles,
    });
  }

  render() {
    let articlesArray = this.state.articles;
    const arrayLength = articlesArray.length;

    if (arrayLength > 6) {
      articlesArray = articlesArray.slice(Math.max(arrayLength - 6, 1));
    }
    const articleItem = articlesArray.map(article => (
      <Card key={article.slug}>
        <Card.Img variant="top" src={coffee} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>Author -{article.author.username}</Card.Text>
          <Button
            variant="primary"
            onClick={function(slug) {
              this.props.history.push(`/article/${article.slug}`);
            }.bind(this)}
          >
            Read More...
          </Button>
        </Card.Body>
      </Card>
    ));
    return (
      <div className="App-header">
        <header>
          <NavbarInstance />
        </header>
        <div>
          <Container>
            <Row className="">
              <Carousel>
                <Carousel.Item>
                  <Image
                    className="d-block w-100 img-responsive"
                    src={coffee}
                    alt="First slide"
                    thumbnail
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    className="d-block w-100"
                    src={create}
                    alt="First slide"
                    thumbnail
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    className="d-block w-100"
                    src={notebook}
                    alt="First slide"
                    thumbnail
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Row>
          </Container>
          <br />
          <Container>
            <CardColumns>{articleItem}</CardColumns>
          </Container>
        </div>
        <br />
        <div className="footer-space" />
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  getArticles: PropTypes.func.isRequired,
  articles: PropTypes.array,
};

const mapStateToProps = state => ({
  articles: state.articles.items,
});
export default connect(
  mapStateToProps,
  { getArticles },
)(HomePage);
