/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-i18nify';

import yup from 'yup';
import Form from 'react-formal';

import { signUp } from '../ducks';
import errorMessages from '../../../services/errorMessages';
import LocalizedFormMessage from '../../../components/LocalizedFormMessage';

export class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.userSchema = yup.object({
      name: yup.string().default('').required('required'),
      email: yup.string().default('').required('required').matches(/@/, 'email'),
      password: yup.string().default('').required('required').min(5, 'passwordLength'),
      password_confirmation: yup.string().default('').required('required'),
    });
  }

  submit(formValue) {
    this.props.signUp(formValue);
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
                <label htmlFor="first_name">
                  <Translate value="registrations.new.name" />
                </label>
                <Form.Field name="name" className="form-control" />
                <LocalizedFormMessage for="name" className="error-message" />
                {errors.name}
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <Translate value="registrations.new.email" />
                </label>
                <Form.Field name="email" type="email" className="form-control" />
                <LocalizedFormMessage for="email" className="error-message" />
                {errors.email}
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
              <div className="form-group ">
                <Form.Button type="submit" className="btn btn-outline-success btn-lg btn-block">
                  <Translate value="registrations.new.save" />
                </Form.Button>
              </div>
              <div className="form-group ">
                <a href="/auth/google" className="btn btn-primary btn-google btn-lg btn-block">
                  <Translate value="registrations.new.google" />
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
  errors: PropTypes.shape({
    first_name: PropTypes.arrayOf(PropTypes.string),
    last_name: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
    password_confirmation: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  signUp: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    errors: state.registrations.errors,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signUp(data) {
      dispatch(signUp(data));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
