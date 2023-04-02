/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-i18nify';

import yup from 'yup';
import Form from 'react-formal';

import errorMessages from '../../../services/errorMessages';
import { clearErrors, updatePassword } from '../ducks';
import LocalizedFormMessage from '../../../components/LocalizedFormMessage';

export class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.schema = yup.object({
      password: yup.string().default('').required('required').min(5, 'passwordLength'),
      password_confirmation: yup.string().default('').required('required'),
    });
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  submit(formValue) {
    this.props.updatePassword(this.props.token, formValue);
  }

  render() {
    const errors = errorMessages(this.props.errors);

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8 col-md-6">
            <Form
              schema={this.schema}
              defaultValue={this.schema.default()}
              onSubmit={this.submit}
            >
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
              <div className="form-group">
                <Form.Button type="submit" className="btn btn-outline-success btn-lg btn-block">
                  <Translate value="users.changePasswordForm.save" />
                </Form.Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  errors: PropTypes.shape({
    password: PropTypes.arrayOf(PropTypes.string),
    password_confirmation: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  updatePassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => (
  {
    token: ownProps.match.params.token,
    errors: state.session.errors,
  }
);

const mapDispatchToProps = dispatch => (
  {
    updatePassword(token, data) {
      dispatch(updatePassword(token, data));
    },
    clearErrors() {
      dispatch(clearErrors());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
