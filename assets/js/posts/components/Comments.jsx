import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import PageLoading from '../../components/PageLoading';
import Comment from './Comment';

export class Comments extends Component {
  renderComments() {
    return this.props.comments.map(comment => (
      <Comment
        key={comment.id}
        locale={this.props.locale}
        {...comment}
      />
    ));
  }

  render() {
    if (this.props.fetching) {
      return (<PageLoading />);
    }
    if (this.props.comments.length === 0) {
      return (
        <div className="row">
          <div className="col-12 post-comments-empty">
            <Translate value="posts.comments.empty" />
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.renderComments()}
      </div>
    );
  }
 }

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  fetching: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
};

Comments.defaultProps = {
  comments: [],
};

export default Comments;
