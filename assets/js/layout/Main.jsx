import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import SessionContainer from './SessionContainer';
import Navbar from './navbar/Navbar';
import Notifications from './Notifications';

import PrivateRoute from '../components/PrivateRoute';

import Landing from '../layout/Landing';

import NotFound from '../components/NotFound';

import GlobalSearch from '../search/pages/GlobalSearch';
import NewPost from '../posts/pages/NewPost';
import EditPost from '../posts/pages/EditPost';
import ShowPost from '../posts/pages/ShowPost';
import UserProfile from '../users/pages/UserProfile';
import UserChangePassword from '../users/pages/UserChangePassword';

import Registration from '../auth/registrations/pages/Registration';
import Login from '../auth/sessions/pages/Login';
import OauthRedirect from '../auth/sessions/pages/OauthRedirect';
import ForgotPassword from '../auth/sessions/pages/ForgotPassword';
import ResetPassword from '../auth/sessions/pages/ResetPassword';

export const Main = props => (
  <SessionContainer>
    <ConnectedRouter history={props.history}>
      <main role="main">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Landing} />

          <Route path="/sign_up" component={Registration} />
          <Route path="/sign_in" component={Login} />
          <Route path="/password/forgotten" component={ForgotPassword} />
          <Route path="/password/reset/:token" component={ResetPassword} />
          <Route path="/sessions/auth" component={OauthRedirect} />

          <Route path="/search" component={GlobalSearch} />
          <Route path="/posts/:postId/show" component={ShowPost} />
          <Route path="/users/:userId/show" component={UserProfile} />
          <PrivateRoute path="/users/edit" component={UserChangePassword} />

          <PrivateRoute path="/posts/new" component={NewPost} />
          <PrivateRoute path="/posts/:postId/edit" component={EditPost} />
          <Route component={NotFound} />
        </Switch>

        <Notifications />
      </main>
    </ConnectedRouter>
    <footer className="text-muted">
      <div className="container">
        <p>
          Designed and built by <a
            href="https://github.com/altmer"
            target="_blank"
            rel="noopener noreferrer"
          >
            @altmer
          </a>
        </p>
      </div>
    </footer>
  </SessionContainer>
);

Main.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Main;
