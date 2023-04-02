import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Avatar from './Avatar';

export const User = props => (
  <div className="user-badge">
    <div className="user-badge-avatar">
      <Link to={`/users/${props.id}/show`}>
        <Avatar color={props.color} initials={props.initials} avatar={props.avatar} />
      </Link>
    </div>
    <div className="user-badge-content">
      <Link to={`/users/${props.id}/show`} className="user-badge-name">
        {props.name}
      </Link>
      {props.children}
    </div>
  </div>
);

User.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  avatar: PropTypes.shape({
    thumb: PropTypes.string,
  }),
  children: PropTypes.node,
};

User.defaultProps = {
  avatar: {
    thumb: null,
  },
  children: null,
};

export default User;
