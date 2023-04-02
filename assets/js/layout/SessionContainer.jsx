import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { fetchCurrentUser, setLocale } from '../auth/sessions/ducks';

export class SessionContainer extends Component {
  componentDidMount() {
    // restore session
    if (localStorage.getItem('phoenixAuthToken')) {
      this.props.fetchCurrentUser();
    }
    this.setLocale();
  }

  componentDidUpdate() {
    // set locale
    this.setLocale();
  }

  setLocale() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.props.setLocale(currentUser.locale);
    } else if (localStorage.getItem('luggageSessionLocale')) {
      this.props.setLocale(localStorage.getItem('luggageSessionLocale'));
    } else {
      // fallback
      this.props.setLocale('en');
    }
  }

  render() {
    return (
      <div className="session-area">
        {this.props.children}
      </div>
    );
  }
}

SessionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    locale: PropTypes.string,
  }),
  fetchCurrentUser: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired,
};

SessionContainer.defaultProps = {
  currentUser: undefined,
};

const mapStateToProps = state => (
  {
    currentUser: state.session.currentUser,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCurrentUser() {
      dispatch(fetchCurrentUser());
    },
    setLocale(locale) {
      dispatch(setLocale(locale));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SessionContainer);
