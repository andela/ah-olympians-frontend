import {
  Card, Container, Grid, Header, Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArticle } from '../../actions/index';
import Thumbnail from './thumbnail.jpg';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
    };
  }

  componentDidMount() {
    this.props.onGetArticle();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      article: nextProps.article.articles,
    });
  }

  render() {
    const articleItem = this.state.article.map(article => (
      <Card fluid className="article-card" key={article.slug}>
        <Grid columns={2} stackable>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              {article.image
                ? <Image className="article-thumbnail" size="small" height="10%" width="10%" src={article.image} />
                : <Image className="article-thumbnail" size="medium" src={Thumbnail} />
              }
            </Grid.Column>
            <Grid.Column verticalAlign="middle" width={10}>
              <Container>
                <Grid stackable>
                  <Grid.Row className="italic article-info">
                    <Grid.Column width={5}>
                      <b>Created at:</b>{article.created_at.substr(0, article.created_at.indexOf('T'))}
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <b>ReadTime</b>{article.read_time}
                    </Grid.Column>
                    <Grid.Column id="article-author-name" width={5}>
                      <b>author:</b>{article.author.username}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Header className="article-header" as="h2">
                        <Link className="article-card-title" to={'/articles/'}>
                          {article.title}
                        </Link>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      {article.description}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
    ));
    return (
      <div>
        {articleItem}
      </div>
    );
  }
}

getArticle().propTypes = {
  getArticle: PropTypes.func,

};

const mapDispatchToProps = dispatch => ({
  onGetArticle: () => {
    dispatch(getArticle());
  },
});
const mapStateToProp = state => ({
  article: state.article.article,
});


export default connect(mapStateToProp, mapDispatchToProps)(Articles);
