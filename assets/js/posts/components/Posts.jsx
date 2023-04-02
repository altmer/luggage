import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Translate } from 'react-i18nify';

import PageLoading from '../../components/PageLoading';
import Post from './Post';

export class Posts extends Component {

  renderPosts() {
    return this.props.posts.map(post => (
      <Post
        key={post.id}
        currentUser={this.props.currentUser}
        locale={this.props.locale}
        {...post}
      />
    ));
  }

  render() {
    if (this.props.fetching) {
      return (<PageLoading />);
    }
    if (!this.props.posts || this.props.posts.length === 0) {
      return (
        <div className="row posts-empty-state">
          <div className="col-12">
            <p><Translate value="posts.empty" /></p>
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.renderPosts()}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  fetching: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({}),
};

Posts.defaultProps = {
  posts: [],
  currentUser: undefined,
};

export default Posts;
