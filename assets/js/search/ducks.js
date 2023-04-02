import axios from 'axios';

import ActionTypes from '../config/action-types';

const initialState = {
  results: [],
};

export const search = term => (
  (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_STARTED });
    return axios.get(`/api/posts?term=${encodeURIComponent(term)}`).then((response) => {
      dispatch({
        type: ActionTypes.SEARCH_FINISHED,
        results: response.data.posts,
      });
    }, () => {
      dispatch({ type: ActionTypes.SEARCH_ERRORED });
    });
  }
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SEARCH_STARTED:
      return { ...state, results: [] };
    case ActionTypes.SEARCH_FINISHED:
      return { ...state, results: action.results };
    case ActionTypes.SEARCH_ERRORED:
      return { ...state, results: [] };
    default:
      return state;
  }
};

export default reducer;
