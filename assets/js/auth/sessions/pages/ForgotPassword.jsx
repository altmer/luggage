/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Translate } from 'react-i18nify';

import yup from 'yup';
import Form from 'react-formal';

import { resetPassword } from '../ducks';
import LocalizedFormMessage from '../../../components/LocalizedFormMessage';

export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.schema = yup.object({
      email: yup.string().default('').required('required'),
    });
  }

  submit(formValue) {
    this.props.resetPassword(formValue.email);
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8 col-md-6">
            <Form schema={this.schema} onSubmit={this.submit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">
                  <Translate value="registrations.new.email" />
                </label>
                <Form.Field name="email" type="email" className="form-control" />
                <LocalizedFormMessage for="email" className="error-message" />
              </div>
              <div className="form-group">
                <Form.Button type="submit" className="btn btn-outline-success btn-lg btn-block">
                  <Translate value="sessions.forgot.action" />
                </Form.Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    resetPassword(email) {
      dispatch(resetPassword(email));
    },
  }
);

export default connect(() => ({}), mapDispatchToProps)(ForgotPassword);
