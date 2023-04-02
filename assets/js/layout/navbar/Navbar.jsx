import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translate } from 'react-i18nify';
import axios from 'axios';

import LocaleMenu from '../navbar/LocaleMenu';
import UserMenu from '../navbar/UserMenu';
import { signOut, setLocale } from '../../auth/sessions/ducks';

const updateLocale = locale => (
  axios.put('/api/sessions/locale', { locale })
);

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.setLocale = this.setLocale.bind(this);
  }

  setLocale(locale) {
    updateLocale(locale);
    this.props.setLocale(locale);
  }

  userMenu() {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <UserMenu
          user={currentUser}
          signOut={this.props.signOut}
        />
      );
    }
    return null;
  }

  login() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return (<li className="nav-item">
        <Link to="/sign_in" className="nav-link">
          <Translate value="sessions.login" />
        </Link>
      </li>);
    }
    return null;
  }

  register() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return (<li className="nav-item hidden-xs-down">
        <Link to="/sign_up" className="nav-link">
          <Translate value="sessions.register" />
        </Link>
      </li>);
    }
    return null;
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light navbar-toggleable-xl my-2">
          <Link className="navbar-brand" to="/">
            The Luggage
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/search" className="search-opener nav-link">
                <img src="/images/search.svg" alt="search" />
                <span className="hidden-xs-down">
                  <Translate value="common.search" />
                </span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <LocaleMenu locale={this.props.locale} setLocale={this.setLocale} />
            {this.register()}
            {this.login()}
            {this.userMenu()}
          </ul>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  locale: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
  }),
  signOut: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  currentUser: undefined,
};

const mapStateToProps = state => (
  {
    currentUser: state.session.currentUser,
    locale: state.session.locale,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signOut() {
      dispatch(signOut());
    },
    setLocale(locale) {
      dispatch(setLocale(locale));
    },
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
