import { render, screen } from '@testing-library/react';
import App from './App';

test('renders categories and channels', () => {
  render(<App />);
  const categoryElements = screen.getAllByText(/TODOS/i);
  expect(categoryElements.length).toBeGreaterThan(0);

  const jetixElement = screen.getAllByText(/Jetix/i);
  expect(jetixElement.length).toBeGreaterThan(0);
});
