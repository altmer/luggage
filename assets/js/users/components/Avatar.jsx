import React from 'react';
import PropTypes from 'prop-types';

export const Avatar = props => (
  <span>
    {!props.avatar.thumb && <div className={`user-avatar user-avatar-placeholder ${props.color}`}>
      {props.initials}
    </div>}
    {props.avatar.thumb && <img
      alt={props.initials}
      src={props.avatar.thumb}
      className="user-avatar"
    />}
  </span>
);

Avatar.propTypes = {
  color: PropTypes.string,
  initials: PropTypes.string,
  avatar: PropTypes.shape({
    thumb: PropTypes.string,
  }),
};

Avatar.defaultProps = {
  color: '',
  initials: '',
  avatar: {
    thumb: null,
  },
};

export default Avatar;
