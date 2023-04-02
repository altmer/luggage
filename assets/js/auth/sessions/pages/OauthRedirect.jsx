import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signInOauth, signInOauthFailed } from '../ducks';

const OauthRedirect = (props) => {
  const params = new URLSearchParams(location.search);

  if (params.get('result') === 'failure') {
    props.signInOauthFailed();
  } else if (params.get('result') === 'success') {
    props.signInOauth(params.get('token'));
  } else {
    // wtf?
    props.signInOauthFailed();
  }

  return <div />;
};

OauthRedirect.propTypes = {
  signInOauth: PropTypes.func.isRequired,
  signInOauthFailed: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    signInOauth(token) {
      dispatch(signInOauth(token));
    },
    signInOauthFailed() {
      dispatch(signInOauthFailed());
    },
  }
);

export default connect(() => ({}), mapDispatchToProps)(OauthRedirect);
