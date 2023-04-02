import axios from 'axios';
import { push } from 'react-router-redux';
import { I18n } from 'react-i18nify';

import ActionTypes from '../../config/action-types';
import { fetchCurrentUser } from '../sessions/ducks';
import { addNotification } from '../../services/notifications';
import { formErrorHandler } from '../../services/errorHandlers';

const initialState = {
  errors: {},
};

export const signUp = data => (
  dispatch => (
    axios.post('/api/registrations', {
      user: data,
    }).then((response) => {
      localStorage.setItem('phoenixAuthToken', response.data.jwt);

      dispatch(fetchCurrentUser());
      dispatch(addNotification(I18n.t('notification.signedIn')));
      dispatch(push('/'));
    }, (error) => {
      formErrorHandler(dispatch, error, ActionTypes.REGISTRATIONS_ERROR);
    })
  )
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.REGISTRATIONS_ERROR:
      return { ...state, errors: action.errors };

    default:
      return state;
  }
};

export default reducer;
