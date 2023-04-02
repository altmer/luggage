/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Translate } from 'react-i18nify';

import yup from 'yup';
import Form from 'react-formal';

import errorMessages from '../../services/errorMessages';
import { updatePassword, clearPasswordErrors } from '../profileDucks';
import LocalizedFormMessage from '../../components/LocalizedFormMessage';

export class UserChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.userSchema = yup.object({
      old_password: yup.string().default('').required('required').min(5, 'passwordLength'),
      password: yup.string().default('').required('required').min(5, 'passwordLength'),
      password_confirmation: yup.string().default('').required('required'),
    });
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  submit(formValue) {
    this.props.updatePassword(this.props.currentUser.id, formValue);
  }

  render() {
    const errors = errorMessages(this.props.errors);

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <Form
              schema={this.userSchema}
              defaultValue={this.userSchema.default()}
              onSubmit={this.submit}
            >
              <div className="form-group">
                <label htmlFor="old_password">
                  <Translate value="users.changePasswordForm.oldPassword" />
                </label>
                <Form.Field name="old_password" type="password" className="form-control" />
                <LocalizedFormMessage for="old_password" className="error-message" />
                {errors.old_password}
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <Translate value="registrations.new.password" />
                </label>
                <Form.Field name="password" type="password" className="form-control" />
                <LocalizedFormMessage for="password" className="error-message" />
                {errors.password}
              </div>
              <div className="form-group">
                <label htmlFor="password_confirmation">
                  <Translate value="registrations.new.passwordConfirmation" />
                </label>
                <Form.Field name="password_confirmation" type="password" className="form-control" />
                <LocalizedFormMessage for="password_confirmation" className="error-message" />
                {errors.password_confirmation}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Form.Button type="submit" className="btn btn-outline-success btn-lg">
                    <Translate value="users.changePasswordForm.save" />
                  </Form.Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

UserChangePassword.propTypes = {
  errors: PropTypes.shape({
    old_password: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
    password_confirmation: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  updatePassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => (
  {
    userId: ownProps.match.params.userId,
    errors: state.userProfile.formPasswordErrors,
    currentUser: state.session.currentUser,
  }
);

const mapDispatchToProps = dispatch => (
  {
    updatePassword(userId, data) {
      dispatch(updatePassword(userId, data));
    },
    clearErrors() {
      dispatch(clearPasswordErrors());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserChangePassword);
