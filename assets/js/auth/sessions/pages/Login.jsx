/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Translate } from 'react-i18nify';

import yup from 'yup';
import Form from 'react-formal';

import { signIn } from '../ducks';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.loginSchema = yup.object({
      email: yup.string(),
      password: yup.string(),
    });
  }

  submit(formValue) {
    this.props.signIn(formValue.email, formValue.password);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <Form schema={this.loginSchema} onSubmit={this.submit} className="login-form">
              <div className="form-group">
                <a href="/auth/google" className="btn btn-primary btn-google btn-lg btn-block">
                  <Translate value="sessions.new.google" />
                </a>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <Translate value="registrations.new.email" />
                </label>
                <Form.Field name="email" type="email" className="form-control" />
                <span className="error-message">
                  {errors.error}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <Translate value="registrations.new.password" />
                </label>
                <Form.Field name="password" type="password" className="form-control" />
              </div>
              <p>
                <Link to="/password/forgotten">
                  <Translate value="sessions.new.forgot" />
                </Link>
              </p>
              <div className="form-group">
                <Form.Button type="submit" className="btn btn-outline-success btn-lg btn-block">
                  <Translate value="sessions.new.save" />
                </Form.Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  // TODO: refactor this
  errors: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  { errors: state.session.errors }
);

const mapDispatchToProps = dispatch => (
  {
    signIn(email, password) {
      dispatch(signIn(email, password));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
