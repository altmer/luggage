import { OrderedSet } from 'immutable';

import ActionTypes from '../config/action-types';

const initialState = {
  list: OrderedSet(),
};

export const addNotification = (message) => {
  const key = new Date().getTime();
  return { type: ActionTypes.ADD_NOTIFICATION, message, key };
};

export const dismissNotification = notification => (
  { type: ActionTypes.DISMISS_NOTIFICATION, notification }
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        list: state.list.add({
          message: action.message,
          key: action.key,
          dismissAfter: 2000,
          action: 'Dismiss',
          onClick: (_notification, dismiss) => {
            dismiss();
          },
        }),
      };

    case ActionTypes.DISMISS_NOTIFICATION:
      return {
        ...state,
        list: state.list.delete(action.notification),
      };

    default:
      return state;
  }
};

export default reducer;
