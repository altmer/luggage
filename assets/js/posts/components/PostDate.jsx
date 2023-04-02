import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

const PostDate = props => (
  <div className="post-date">
    {moment.locale(props.locale) && moment(props.date).format('ll')}
  </div>
);

PostDate.propTypes = {
  locale: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default PostDate;
