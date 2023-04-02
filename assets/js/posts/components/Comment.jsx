import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import User from '../../users/components/User';

export const Comment = props => (
  <div className="row post-comment">
    <div className="col-12">
      <div className="post-comment-author">
        <User {...props.user}>
          <div className="post-comment-date">
            {moment.locale(props.locale) && moment(`${props.inserted_at}Z`).fromNow()}
          </div>
        </User>
      </div>
      <p className="post-comment-body">
        {props.text}
      </p>
    </div>
  </div>
);

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  inserted_at: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,

  locale: PropTypes.string.isRequired,
};

export default Comment;
