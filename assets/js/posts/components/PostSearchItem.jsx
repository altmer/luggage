import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../users/components/Avatar';

export const PostSearchItem = props => (
  <div className="post-search-item">
    <Avatar {...props.user} />
    {props.title}
  </div>
);

PostSearchItem.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostSearchItem;
