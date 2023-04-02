import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Translate } from 'react-i18nify';

import PostDate from './PostDate';
import User from '../../users/components/User';

export const Post = props => (
  <div className="row post">
    <div className="col-12">
      <div className="post-author">
        <User {...props.user}>
          <PostDate locale={props.locale} date={props.inserted_at} />
        </User>
      </div>
      <h4 className="post-title">
        <Link to={`/posts/${props.id}/show`}>
          {props.title}
        </Link>
      </h4>
      <p className="post-body">{props.body}</p>
      <Link to={`/posts/${props.id}/show`} className="secondary-link">
        <Translate value="posts.readMore" />
      </Link>
    </div>
  </div>
);

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  inserted_at: PropTypes.string.isRequired,
};

export default Post;
