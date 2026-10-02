import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

const renderAt = (path) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

describe('routes', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders the home page', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1, name: /fencing and railings/i })).toBeInTheDocument();
  });

  it('renders the contact page with the quote form', () => {
    renderAt('/contact');
    expect(screen.getByRole('heading', { name: /get a free quote/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it.each([
    ['/services/fencing', 'Fencing'],
    ['/services/railings', 'Railings'],
    ['/services/gates', 'Gates'],
    ['/services/sheds', 'Sheds'],
    ['/services/tree-felling', 'Tree Felling & Stump Grinding'],
  ])('renders the %s Service page', (path, title) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  });

  it('shows the 404 page for an unknown URL', () => {
    renderAt('/no-such-page');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });
});
