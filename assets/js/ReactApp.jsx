import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import Main from './layout/Main';
import configureStore from './config/store';

const history = createHistory();

const store = configureStore(history);

const App = props => (
  <Provider store={props.store}>
    <Main history={history} />
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('luggage-app'));
};

export default renderApp;
