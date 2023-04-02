import axios from 'axios';
import { push } from 'react-router-redux';
import { I18n } from 'react-i18nify';

import ActionTypes from '../config/action-types';
import { addNotification } from '../services/notifications';
import { formErrorHandler, criticalErrorHandler, nonCriticalErrorHandler } from '../services/errorHandlers';

const initialState = {
  currentPost: {},
  postFetching: false,

  comments: [],
  commentsFetching: false,
  hasMoreComments: false,
  commentsPage: 0,
  commentsTotalPages: 0,
  commentsFetchingMore: false,

  formErrors: {},
};

const paginationAction = data => (
  {
    page: data.page,
    totalPages: data.total_pages,
    hasMore: data.page < data.total_pages,
  }
);

export const fetchPost = postId => (
  (dispatch) => {
    dispatch({ type: ActionTypes.POST_FETCHING });

    return axios.get(`/api/posts/${postId}`).then((response) => {
      const post = response.data.data;

      dispatch({
        type: ActionTypes.POST_RECEIVED,
        post,
      });
    }, () => {
      criticalErrorHandler(dispatch);
    });
  }
);

export const fetchComments = postId => (
  (dispatch) => {
    dispatch({ type: ActionTypes.POST_COMMENTS_FETCHING });

    return axios.get(`/api/comments?post_id=${postId}`).then((response) => {
      dispatch({
        type: ActionTypes.POST_COMMENTS_RECEIVED,
        comments: response.data.comments,
        ...paginationAction(response.data),
      });
    }, () => {
      criticalErrorHandler(dispatch);
    });
  }
);

export const fetchMoreComments = (page, postId) => (
  (dispatch) => {
    dispatch({ type: ActionTypes.POST_MORE_COMMENTS_FETCHING });
    return axios.get(`/api/comments?post_id=${postId}&page=${page}`).then((response) => {
      dispatch({
        type: ActionTypes.POST_MORE_COMMENTS_RECEIVED,
        comments: response.data.comments,
        ...paginationAction(response.data),
      });
    }, () => {
      nonCriticalErrorHandler(dispatch);
      dispatch({
        type: ActionTypes.POST_MORE_COMMENTS_FETCHING_ERRORED,
      });
    });
  }
);

export const commentReceived = comment => (
  {
    type: ActionTypes.POST_COMMENT_RECEIVED,
    comment,
  }
);

export const deletePost = postId => (
  dispatch => (
    axios.delete(`/api/posts/${postId}`).then(() => {
      dispatch(addNotification(I18n.t('notification.postDeleted')));
      dispatch(push('/'));
    }, () => {
      nonCriticalErrorHandler(dispatch);
    })
  )
);

export const createPost = data => (
  dispatch => (
    axios.post('/api/posts', {
      post: data,
    }).then(() => {
      dispatch(push('/'));
      dispatch(addNotification(I18n.t('notification.postCreated')));
    }, (error) => {
      formErrorHandler(dispatch, error, ActionTypes.POST_SAVE_ERRORED);
    })
  )
);

export const updatePost = (postId, data) => (
  dispatch => (
    axios.put(`/api/posts/${postId}`, {
      post: data,
    }).then(() => {
      dispatch(push(`/posts/${postId}/show`));
      dispatch(addNotification(I18n.t('notification.postSaved')));
    }).catch((error) => {
      formErrorHandler(dispatch, error, ActionTypes.POST_SAVE_ERRORED);
    })
  )
);

export const clearErrors = () => ({ type: ActionTypes.POST_CLEAR_ERRORS });

const paginationReducer = action => (
  {
    commentsPage: action.page,
    commentsTotalPages: action.totalPages,
    hasMoreComments: action.hasMore,
  }
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.POST_SAVE_ERRORED:
      return { ...state, formErrors: action.errors };
    case ActionTypes.POST_CLEAR_ERRORS:
      return { ...state, formErrors: {} };

    case ActionTypes.POST_FETCHING:
      return { ...state, currentPost: {}, postFetching: true, channel: null };
    case ActionTypes.POST_RECEIVED:
      return { ...state, currentPost: action.post, postFetching: false };

    case ActionTypes.POST_COMMENTS_FETCHING:
      return { ...state, comments: [], commentsFetching: true };
    case ActionTypes.POST_COMMENTS_RECEIVED:
      return {
        ...state,
        ...paginationReducer(action),
        comments: action.comments,
        commentsFetching: false,
      };
    case ActionTypes.POST_MORE_COMMENTS_FETCHING:
      return { ...state, commentsFetchingMore: true };
    case ActionTypes.POST_MORE_COMMENTS_FETCHING_ERRORED:
      return { ...state, commentsFetchingMore: false };
    case ActionTypes.POST_MORE_COMMENTS_RECEIVED:
      return {
        ...state,
        ...paginationReducer(action),
        comments: state.comments.concat(action.comments),
        commentsFetchingMore: false,
      };
    case ActionTypes.POST_COMMENT_RECEIVED:
      return { ...state, comments: [action.comment].concat(state.comments) };

    default:
      return state;
  }
};

export default reducer;
