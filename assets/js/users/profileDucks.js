import axios from 'axios';
import { push } from 'react-router-redux';
import { I18n } from 'react-i18nify';

import ActionTypes from '../config/action-types';
import { addNotification } from '../services/notifications';
import { formErrorHandler, criticalErrorHandler } from '../services/errorHandlers';

const initialState = {
  user: {},
  fetching: false,
  edit: false,
  formErrors: {},
  avatarUploading: false,
  formPasswordErrors: {},
};

export const startEdit = () => ({ type: ActionTypes.USER_START_EDIT });
export const stopEdit = () => ({ type: ActionTypes.USER_STOP_EDIT });

export const fetchUser = userId => (
  (dispatch) => {
    dispatch({ type: ActionTypes.USER_FETCHING });

    return axios.get(`/api/users/${userId}`).then((response) => {
      dispatch({
        type: ActionTypes.USER_RECEIVED,
        user: response.data,
      });
    }, () => {
      criticalErrorHandler(dispatch);
    });
  }
);

export const saveUser = (userId, formData) => (
  dispatch => (
    axios.put(`/api/users/${userId}`, {
      user: formData,
    }).then((response) => {
      dispatch({
        type: ActionTypes.USER_RECEIVED,
        user: response.data,
      });
      dispatch(stopEdit());
      dispatch(addNotification(I18n.t('notification.userProfileUpdated')));
    }, (result) => {
      formErrorHandler(dispatch, result, ActionTypes.USER_SAVE_ERRORED);
    })
  )
);

export const updatePassword = (userId, formData) => (
  dispatch => (
    axios.put(`/api/users/${userId}/update_password`, {
      user: formData,
    }).then(() => {
      dispatch(push(`/users/${userId}/show`));
      dispatch(addNotification(I18n.t('notification.userPasswordChanged')));
    }, (error) => {
      formErrorHandler(dispatch, error, ActionTypes.USER_CHANGE_PASSWORD_FAILED);
    })
  )
);

export const clearPasswordErrors = () => ({ type: ActionTypes.USER_CHANGE_PASSWORD_CLEAR_ERRORS });

export const uploadAvatar = (userId, file, crop) => (
  (dispatch) => {
    dispatch({ type: ActionTypes.USER_UPLOAD_AVATAR_START });

    const data = new FormData();
    // convert crop to form values
    data.append('user[crop_x]', crop.x);
    data.append('user[crop_y]', crop.y);
    data.append('user[crop_width]', crop.width);
    data.append('user[crop_height]', crop.height);
    data.append('user[avatar]', file);

    return axios.put(`/api/users/${userId}/avatar`, data)
                .then((response) => {
                  dispatch({
                    type: ActionTypes.USER_UPLOAD_AVATAR_SUCCESS,
                    avatar: response.data.avatar,
                  });
                }, (result) => {
                  formErrorHandler(dispatch, result, ActionTypes.USER_UPLOAD_AVATAR_ERROR, I18n.t('users.avatar.wrongFile'));
                });
  }
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.USER_FETCHING:
      return { ...state, user: {}, fetching: true };
    case ActionTypes.USER_RECEIVED:
      return { ...state, user: action.user, fetching: false };
    case ActionTypes.USER_SAVE_ERRORED:
      return { ...state, formErrors: action.errors };

    case ActionTypes.USER_START_EDIT:
      return { ...state, edit: true };
    case ActionTypes.USER_STOP_EDIT:
      return { ...state, edit: false };

    case ActionTypes.USER_UPLOAD_AVATAR_START:
      return { ...state, avatarUploading: true };
    case ActionTypes.USER_UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        avatarUploading: false,
        user: Object.assign(state.user, { avatar: action.avatar }),
      };
    case ActionTypes.USER_UPLOAD_AVATAR_ERROR:
      return { ...state, avatarUploading: false };

    case ActionTypes.USER_CHANGE_PASSWORD_FAILED:
      return { ...state, formPasswordErrors: action.errors };

    case ActionTypes.USER_CHANGE_PASSWORD_CLEAR_ERRORS:
      return { ...state, formPasswordErrors: {} };

    default:
      return state;
  }
};

export default reducer;
