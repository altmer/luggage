import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

import UserFactory from '../factories/user';
import { User } from '../../js/users/components/User';

const user = UserFactory.build();

test('it renders user information', () => {
  const subject = renderer.create(<MemoryRouter>
    <User {...user} />
  </MemoryRouter>);
  expect(subject.toJSON()).toMatchSnapshot();
});
