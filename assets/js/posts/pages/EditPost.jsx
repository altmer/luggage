import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import PageLoading from '../../components/PageLoading';
import { fetchPost, clearErrors, updatePost } from '../editDucks';
import PostForm from '../components/PostForm';

export class EditPost extends Component {
  // TODO: consider using @autobind
  constructor(props) {
    super(props);
    this.updatePost = this.updatePost.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  componentDidMount() {
    this.props.fetchPost(this.props.postId);
  }

  updatePost(data) {
    this.props.updatePost(this.props.postId, data);
  }

  cancel() {
    this.props.cancel(this.props.postId);
  }

  render() {
    if (this.props.postFetching) {
      return (<PageLoading />);
    }
    return (
      <PostForm
        onSave={this.updatePost}
        onCancel={this.cancel}
        errors={this.props.errors}
        {...this.props.post}
      />
    );
  }
}

EditPost.propTypes = {
  postId: PropTypes.string.isRequired,
  postFetching: PropTypes.bool.isRequired,
  post: PropTypes.shape({}),
  errors: PropTypes.shape({}),

  fetchPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

EditPost.defaultProps = {
  post: undefined,
  errors: undefined,
};

const mapStateToProps = (state, ownProps) => (
  {
    postId: ownProps.match.params.postId,
    postFetching: state.postsShow.postFetching,
    post: state.postsShow.currentPost,
    errors: state.postsShow.formErrors,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPost: postId => dispatch(fetchPost(postId)),
    clearErrors: () => dispatch(clearErrors()),
    updatePost: (postId, data) => dispatch(updatePost(postId, data)),
    cancel(postId) {
      dispatch(push(`/posts/${postId}/show`));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
