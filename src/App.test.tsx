import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './utils/test-utils';
import { App } from './App';

test('renders App component', () => {
  const app = render(<App />);
  expect(app).toBeDefined();
});
