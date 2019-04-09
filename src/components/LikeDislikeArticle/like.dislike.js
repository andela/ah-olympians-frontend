import React, { Component } from 'react';
import { Icon, Label, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import likeArticle from '../../actions/likearticle';

export class ArticleLiking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes_count: null,
      dislikes_count: null,
      status: '',
      liked: false,
      disliked: false,
    };
  }

  componentDidMount() {
    this.setState({
      likes_count: this.props.article.article.likes_count,
      dislikes_count: this.props.article.article.dislikes_count,
      status: this.state.status,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.likesData !== this.props.likesData) {
      this.setState({ ...nextProps.likesData });
    }
    this.setState({
      likes_count: nextProps.article.article.likes_count,
      dislikes_count: nextProps.article.article.dislikes_count,
    });
  }

  handleLike = () => {
    const data = {
      slug: this.props.slug,
      action: 'like',
    };
    this.setState({
      status: data.action,
    });
    this.props.likeArticle(data);
  };

  handleunLike = () => {
    const data = {
      slug: this.props.slug,
      action: 'unlike',
    };
    this.setState({
      status: data.action,
    });
    this.props.likeArticle(data);
  };

  handleDislike = () => {
    const data = {
      slug: this.props.slug,
      action: 'dislike',
    };
    this.setState({ status: data.action });
    this.props.likeArticle(data);
  };

  render() {
    let likeColor = '';
    let dislikeColor = '';
    switch (this.state.status) {
      case 'like':
        likeColor = 'blue';
        dislikeColor = '';
        break;
      case 'dislike':
        dislikeColor = 'blue';
        likeColor = '';
        break;
      default:
        dislikeColor = '';
        likeColor = '';
    }

    return (
      <div>
        <Button
          as="div"
          labelPosition="right"
          className="like-buttton"
          onClick={this.handleLike}
        >
          <Button color={likeColor}>
            <Icon name="thumbs up" />
            Like
          </Button>
          <Label as="a" basic color={likeColor} pointing="left">
            {this.state.likes_count ? this.state.likes_count : 0}
          </Label>
        </Button>
        <Button
          as="div"
          labelPosition="right"
          className="dislike-button"
          onClick={this.handleDislike}
        >
          <Button color={dislikeColor}>
            <Icon name="thumbs down" />
            Dislike
          </Button>
          <Label as="a" basic color={dislikeColor} pointing="left">
            {this.state.dislikes_count ? this.state.dislikes_count : 0}
          </Label>
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  likeArticle: data => dispatch(likeArticle(data)),
});

const mapStateToProps = state => ({
  article: state.articles.item,
  likesData: state.sendLike.data,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleLiking);
