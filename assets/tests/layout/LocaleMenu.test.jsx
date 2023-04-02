import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { LocaleMenu } from '../../js/layout/navbar/LocaleMenu';

test('it renders locale menu', () => {
  const subject = renderer.create(
    <LocaleMenu
      locale="ru"
      setLocale={jest.fn()}
    />);
  expect(subject.toJSON()).toMatchSnapshot();
});

test('it calls setLocale callback on click', () => {
  const setLocaleMock = jest.fn();
  const subject = mount(
    <LocaleMenu
      locale="ru"
      setLocale={setLocaleMock}
    />);
  subject.find('.locale-link-en').simulate('click');
  expect(setLocaleMock).toHaveBeenCalledWith('en', expect.anything());
});
