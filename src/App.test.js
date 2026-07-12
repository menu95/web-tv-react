import { render, screen } from '@testing-library/react';
import App from './App';

test('renders categories side bar', () => {
  render(<App />);
  const categoryElements = screen.getAllByText(/TODOS/i);
  expect(categoryElements.length).toBeGreaterThan(0);
});
