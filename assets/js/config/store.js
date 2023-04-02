import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import session from '../auth/sessions/ducks';
import registrations from '../auth/registrations/ducks';
import postsIndex from '../posts/searchDucks';
import postsShow from '../posts/editDucks';
import notifications from '../services/notifications';
import userProfile from '../users/profileDucks';
import search from '../search/ducks';

const reducers = combineReducers({
  notifications,
  session,
  registrations,
  userProfile,
  postsIndex,
  postsShow,
  search,
  router: routerReducer,
});

export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const createStoreWithMiddleware = applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
  )(createStore);

  return createStoreWithMiddleware(reducers);
}
