import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overlay, Popover } from 'react-bootstrap';
import './NotificationBadge.scss';

export class NotificationBadgeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      close: true,
      notifications: null,
    };

    this.handleClick = ({ target }) => {
      const { close } = this.state;
      if (close) {
        this.setState(newState => ({ target, show: !newState.show }));
        this.state.close = false;
      }
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.notify).length !== 0) {
      this.setState({
        notifications: nextProps.notify,
      });
    }
  }

  handleClose() {
    this.setState(newState => ({ close: !newState.close }));
    this.setState({
      show: false,
    });
  }

  render() {
    const { show, target, notifications } = this.state;
    // console.log(notifications);

    return (
      <div className="mr-3">
        {notifications ? (
          <i className="fa fa-bell fa-1x icon-blue" onClick={this.handleClick}>
            <span className="badge-1">{Object.keys(notifications).length}</span>
            <Overlay
              show={show}
              target={target}
              placement="bottom"
              container={this}
              containerPadding={20}
            >
              <Popover id="popover-contained" title="Notifications">
                <div className="content">
                  {Object.keys(notifications).map(obj => (
                    <div>
                      <li key={obj}><a href={`article/${notifications[obj].slug}`}>{notifications[obj].notification}</a></li>
                      <hr />
                    </div>
                  ))}
                </div>
                <div className="popover-footer">
                  <button
                    type="button"
                    className="b btn-info"
                    onClick={this.handleClose}
                  >
                    close
                  </button>
                  <button
                    type="button"
                    className="b btn-warning"
                    onClick={this.handleClose}
                    disabled
                  >
                    mark all as read
                  </button>
                </div>
              </Popover>
            </Overlay>
          </i>
        ) : (
          <i className="fa fa-bell fa-2x icon-blue" onClick={this.handleClick}>
            <Overlay
              show={show}
              target={target}
              placement="bottom"
              container={this}
              containerPadding={20}
            >
              <Popover id="popover-contained" title="Notifications">
                <div className="content">
                  <li>You have no notifications</li>
                </div>
                <div className="popover-footer">
                  <button
                    type="button"
                    className="close-notification"
                    onClick={this.handleClose}
                  >
                    close
                  </button>
                </div>
              </Popover>
            </Overlay>
          </i>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notify: state.notifications.notifications.notifications,
});

const NotificationBadge = connect(
  mapStateToProps,
  null,
)(NotificationBadgeComponent);

export default NotificationBadge;
