import { render, screen } from '@testing-library/react';
import App from '../App';

test('Site is showing', () => {
  const DATA = [{id: "todo-0", name: "Testing", completed: true}];
  render(<App tasks={DATA} />);
  const linkElement = screen.getByText("To-do List Project");
  expect(linkElement).toBeInTheDocument();
});

test('Adding field is showing', () => {
  const DATA = [{id: "todo-0", name: "Testing", completed: true}];
  render(<App tasks={DATA} />);
  const linkElement = screen.getByText("Add");
  expect(linkElement).toBeInTheDocument();
});

test('Task buttons is showing', () => {
  const DATA = [{id: "todo-0", name: "Testing", completed: true}];
  render(<App tasks={DATA} />);
  const linkElement = screen.getByText("Edit");
  expect(linkElement).toBeInTheDocument();
});