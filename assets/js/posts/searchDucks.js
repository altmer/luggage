import axios from 'axios';

import ActionTypes from '../config/action-types';
import { nonCriticalErrorHandler } from '../services/errorHandlers';

const initialState = {
  posts: [],
  fetching: true,

  page: 0,
  totalPages: 0,
  hasMore: false,
  fetchingMore: false,
};

const paginationAction = data => (
  {
    page: data.page,
    totalPages: data.total_pages,
    hasMore: data.page < data.total_pages,
  }
);

const query = (filters = {}) => {
  const pageQuery = filters.page ? `page=${filters.page}` : null;
  const userQuery = filters.userId ? `user_id=${filters.userId}` : null;
  // remove nulls and join query
  const queryString = [pageQuery, userQuery].filter(q => q).join('&');
  return axios.get(`/api/posts?${queryString}`);
};

export const fetchPosts = (page, userId) => (
  (dispatch) => {
    dispatch({ type: ActionTypes.POSTS_FETCHING });

    return query({ page, userId }).then((response) => {
      dispatch({
        type: ActionTypes.POSTS_RECEIVED,
        posts: response.data.posts,
        ...paginationAction(response.data),
      });
    }, () => {
      nonCriticalErrorHandler(dispatch);
    });
  }
);

export const fetchMorePosts = (page, userId) => (
  (dispatch) => {
    dispatch({ type: ActionTypes.MORE_POSTS_FETCHING });
    return query({ page, userId }).then((response) => {
      dispatch({
        type: ActionTypes.MORE_POSTS_RECEIVED,
        posts: response.data.posts,
        ...paginationAction(response.data),
      });
    }, () => {
      nonCriticalErrorHandler(dispatch);
      dispatch({
        type: ActionTypes.MORE_POSTS_FETCHING_ERRORED,
      });
    });
  }
);

const paginationReducer = action => (
  { page: action.page, totalPages: action.totalPages, hasMore: action.hasMore }
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.POSTS_FETCHING:
      return { ...state, fetching: true };
    case ActionTypes.POSTS_RECEIVED:
      return { ...state, ...paginationReducer(action), posts: action.posts, fetching: false };
    case ActionTypes.MORE_POSTS_FETCHING:
      return { ...state, fetchingMore: true };
    case ActionTypes.MORE_POSTS_FETCHING_ERRORED:
      return { ...state, fetchingMore: false };
    case ActionTypes.MORE_POSTS_RECEIVED:
      return {
        ...state,
        ...paginationReducer(action),
        posts: state.posts.concat(action.posts),
        fetchingMore: false,
      };

    default:
      return state;
  }
};

export default reducer;
