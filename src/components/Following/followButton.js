import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { followUser, unfollowUser } from '../../actions/index';

class ButtonFollow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followStatus: props.followStatus,
      userId: props.userId,
    };
  }

  handleClick = () => {
    const { followUser, unfollowUser } =this.props;
    let { followStatus, userId } = this.state;
    if (followStatus === true) {
      this.setState({ followStatus: false }, () => unfollowUser(userId));
    } else {
      this.setState({ followStatus: true }, () => followUser(userId));
    }
  };

  render() {
    const { followStatus } = this.state;
    return (
      <Button onClick={this.handleClick} className="btn btn-success btn-lg">
        {followStatus ? 'Unfollow' : 'Follow'}
      </Button>
    );
  }
}

ButtonFollow.propTypes = {
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  followStatus: PropTypes.bool,
  userId: PropTypes.number,
};

const mapDispatchToProps = dispatch => ({
  followUser: (user) => dispatch(followUser(user)),
  unfollowUser: (user) => dispatch(unfollowUser(user)),
});

const FollowButton = connect(
  null,
  mapDispatchToProps,
)(ButtonFollow);

export default FollowButton;
