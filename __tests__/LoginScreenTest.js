import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../Screens/LoginScreen'

test('renders correctly', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});