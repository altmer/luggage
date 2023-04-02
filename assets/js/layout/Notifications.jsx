import React from 'react';
import PropTypes from 'prop-types';

import { NotificationStack } from 'react-notification';
import { connect } from 'react-redux';

import { dismissNotification } from '../services/notifications';

export const Notifications = props => (
  <NotificationStack
    notifications={props.notifications.toArray()}
    onDismiss={notification => props.dismissNotification(notification)}
  />
);

Notifications.propTypes = {
  notifications: PropTypes.shape({
    toArray: PropTypes.func,
  }),
  dismissNotification: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  currentUser: undefined,
  notifications: undefined,
};


const mapStateToProps = state => (
  {
    notifications: state.notifications.list,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dismissNotification(notification) {
      dispatch(dismissNotification(notification));
    },
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
