/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Translate } from 'react-i18nify';

import yup from 'yup';
import Form from 'react-formal';

import errorMessages from '../../services/errorMessages';
import LocalizedFormMessage from '../../components/LocalizedFormMessage';

export class UserProfileForm extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.userSchema = yup.object({
      name: yup.string().default(this.props.name || '').required('required'),
      bio: yup.string().default(this.props.bio || ''),
    });
  }

  save(formValue) {
    this.props.onSave(formValue);
  }

  render() {
    const errors = errorMessages(this.props.errors);
    return (
      <Form
        schema={this.userSchema}
        defaultValue={this.userSchema.default()}
        onSubmit={this.save}
        className="user-profile-info"
      >
        <div className="form-group">
          <label htmlFor="userName">
            <Translate value="registrations.new.name" />
          </label>
          <Form.Field name="name" className="form-control" />
          <LocalizedFormMessage for="name" className="error-message" />
          {errors.name}
        </div>
        <div className="form-group">
          <label htmlFor="userBio">
            <Translate value="users.form.bio" />
          </label>
          <Form.Field name="bio" className="form-control" type="textarea" rows="3" />
          <LocalizedFormMessage for="bio" className="error-message" />
          {errors.bio}
        </div>
        <div className="form-group user-edit-controls">
          <Form.Button type="submit" className="btn btn-outline-success">
            <Translate value="users.save" />
          </Form.Button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.props.onCancel}
          >
            <Translate value="users.cancel" />
          </button>
        </div>
      </Form>
    );
  }

}

UserProfileForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  name: PropTypes.string,
  bio: PropTypes.string,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
  }),
};

UserProfileForm.defaultProps = {
  name: undefined,
  bio: undefined,
  errors: {},
};

export default UserProfileForm;
