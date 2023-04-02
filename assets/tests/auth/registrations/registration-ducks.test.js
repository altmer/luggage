import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AxiosMock from 'axios-mock-adapter';

import UserFactory from '../../factories/user';
import ActionTypes from '../../../js/config/action-types';
import { signUp } from '../../../js/auth/registrations/ducks';

require('../../support/localStorage');
require('regenerator-runtime'); // eslint-disable-line import/no-extraneous-dependencies

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  const setupStore = () => mockStore({ errors: {} });
  const mockedAxios = new AxiosMock(axios);

  beforeEach(() => {
    localStorage.removeItem('phoenixAuthToken');
  });

  describe('signUp action creator', () => {
    it('adds token to localStorage, dispatches fetchCurrentUser, notification and redirect on success', async () => {
      // setup
      const formData = { first_name: 'Andy', last_name: 'Marsh' };
      const user = UserFactory.build();
      mockedAxios.onPost('/api/registrations', { user: formData }).replyOnce(200, { user, jwt: 'sign_up_token' });
      mockedAxios.onGet('/api/current_user').replyOnce(200, user);
      const store = setupStore();

      // subject
      await store.dispatch(signUp(formData));

      expect(localStorage.getItem('phoenixAuthToken')).toBe('sign_up_token');
      const actions = store.getActions();
      expect(actions[0]).toMatchObject({
        type: ActionTypes.ADD_NOTIFICATION,
        message: 'Signed In',
      });
      expect(actions[1]).toMatchObject({
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: ['/'],
        },
      });
    });

    it('dispatches errors on error', async () => {
      // setup
      const errors = { first_name: ['wrong'] };
      mockedAxios.onPost('/api/registrations').replyOnce(422, { errors });
      const store = setupStore();

      // subject
      await store.dispatch(signUp());
      expect(localStorage.getItem('phoenixAuthToken')).toBeUndefined();
      expect(store.getActions()).toEqual([{
        type: ActionTypes.REGISTRATIONS_ERROR,
        errors,
      }]);
    });
  });
});
