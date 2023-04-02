import axios from 'axios';
import { push, goBack } from 'react-router-redux';
import { I18n } from 'react-i18nify';
import { Socket } from 'phoenix';

import ActionTypes from '../../config/action-types';
import { addNotification } from '../../services/notifications';
import { formErrorHandler, nonCriticalErrorHandler, criticalErrorHandler } from '../../services/errorHandlers';

const initialState = {
  currentUser: null,
  socket: null,
  errors: {},
  locale: 'en',
};

export const fetchCurrentUser = () => (
  dispatch => (
    axios.get('/api/current_user').then((response) => {
      const token = localStorage.getItem('phoenixAuthToken');
      const socket = new Socket('/socket', { params: { token } });

      socket.connect();

      dispatch({
        type: ActionTypes.CURRENT_USER,
        currentUser: response.data,
        socket,
      });
    }, () => {
      localStorage.removeItem('phoenixAuthToken');
      nonCriticalErrorHandler(dispatch);
    })
  )
);

export const signIn = (email, password) => (
  (dispatch) => {
    const data = { session: { email, password } };

    return axios.post('/api/sessions', data).then((response) => {
      const token = response.data.jwt;
      localStorage.setItem('phoenixAuthToken', token);

      dispatch(fetchCurrentUser());
      dispatch(addNotification(I18n.t('notification.signedIn')));
      dispatch(goBack());
    }, (error) => {
      formErrorHandler(dispatch, error, ActionTypes.SESSION_ERROR);
    });
  }
);

export const signInOauth = token => (
  (dispatch) => {
    localStorage.setItem('phoenixAuthToken', token);
    dispatch(addNotification(I18n.t('notification.signedIn')));
    dispatch(push('/'));
  }
);

export const signInOauthFailed = () => (
  (dispatch) => {
    dispatch(addNotification(I18n.t('notification.oauthFailed')));
    dispatch(push('/'));
  }
);

export const signOut = () => (
  dispatch => (
    axios.delete('/api/sessions').then(() => {
      localStorage.removeItem('phoenixAuthToken');
      dispatch({ type: ActionTypes.SIGNED_OUT });
      dispatch(addNotification(I18n.t('notification.signedOut')));
      dispatch(push('/'));
    }, () => {
      nonCriticalErrorHandler(dispatch);
    })
  )
);

export const setLocale = (locale) => {
  I18n.setLocale(locale);
  localStorage.setItem('luggageSessionLocale', locale);
  return { type: ActionTypes.SET_LOCALE, locale };
};

export const clearErrors = () => (
  { type: ActionTypes.CLEAR_SESSION_ERRORS }
);

export const resetPassword = email => (
  dispatch => (
    axios.post('/api/passwords/reset', { email }).then(() => {
      dispatch(addNotification(I18n.t('notification.passwordReset.requested')));
      dispatch(push('/'));
    }, () => {
      criticalErrorHandler(dispatch);
    })
  )
);

export const updatePassword = (token, formData) => (
  dispatch => (
    axios.post('/api/passwords', { password_reset: formData, jwt: token }).then(() => {
      dispatch(addNotification(I18n.t('notification.passwordReset.success')));
      dispatch(push('/'));
      dispatch(push('/sign_in'));
    }, (error) => {
      if (error.response.status === 403) {
        dispatch(addNotification(I18n.t('notification.passwordReset.invalidToken')));
        dispatch(push('/'));
      } else {
        formErrorHandler(dispatch, error, ActionTypes.SESSION_ERROR);
      }
    })
  )
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_LOCALE:
      return { ...state, locale: action.locale };

    case ActionTypes.CURRENT_USER:
      return { ...state, currentUser: action.currentUser, errors: {}, socket: action.socket };

    case ActionTypes.SESSION_ERROR:
      return { ...state, errors: action.errors };

    case ActionTypes.CLEAR_SESSION_ERRORS:
      return { ...state, errors: {} };

    case ActionTypes.SIGNED_OUT:
      return { ...state, currentUser: null, errors: {}, socket: null };

    default:
      return state;
  }
};

export default reducer;
