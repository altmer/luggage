/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Translate } from 'react-i18nify';

import yup from 'yup';
import Form from 'react-formal';

import errorMessages from '../../services/errorMessages';
import LocalizedFormMessage from '../../components/LocalizedFormMessage';

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.postSchema = yup.object({
      title: yup.string().default(this.props.title).required('required'),
      body: yup.string().default(this.props.body).required('required'),
    });
  }

  save(formValue) {
    this.props.onSave({ title: formValue.title, body: formValue.body });
  }

  render() {
    const errors = errorMessages(this.props.errors);
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <Form
              schema={this.postSchema}
              defaultValue={this.postSchema.default()}
              onSubmit={this.save}
            >
              <div className="form-group">
                <label htmlFor="postTitle">
                  <Translate value="posts.title" />
                </label>
                <Form.Field name="title" className="form-control" />
                <LocalizedFormMessage for="title" className="error-message" />
                {errors.title}
              </div>
              <div className="form-group">
                <label htmlFor="postBody">
                  <Translate value="posts.body" />
                </label>
                <Form.Field name="body" className="form-control" type="textarea" rows="10" />
                <LocalizedFormMessage for="body" className="error-message" />
                {errors.body}
              </div>
              <div className="row">
                <div className="col-md-12 btn-group">
                  <Form.Button type="submit" className="btn btn-outline-success btn-lg">
                    <Translate value="posts.save" />
                  </Form.Button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={this.props.onCancel}
                  >
                    <Translate value="posts.cancel" />
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  errors: PropTypes.shape({
    body: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.arrayOf(PropTypes.string),
  }),
};

PostForm.defaultProps = {
  title: undefined,
  body: undefined,
  errors: undefined,
};

export default PostForm;
