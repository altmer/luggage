import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import PostForm from '../components/PostForm';
import { createPost, clearErrors } from '../editDucks';

export class NewPost extends Component {
  componentWillMount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <PostForm
        onSave={this.props.createPost}
        onCancel={this.props.cancel}
        errors={this.props.errors}
      />
    );
  }
}

NewPost.propTypes = {
  errors: PropTypes.shape({}).isRequired,
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    errors: state.postsShow.formErrors,
  }
);

const mapDispatchToProps = dispatch => (
  {
    createPost(data) {
      dispatch(createPost(data));
    },
    clearErrors() {
      dispatch(clearErrors());
    },
    cancel() {
      dispatch(push('/'));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
