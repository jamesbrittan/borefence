import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { services, servicePath } from './catalogue/services';

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

  it.each(services.map((service) => [servicePath(service), service.name]))(
    'renders the %s Service page',
    (path, name) => {
      renderAt(path);
      expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();
      expect(document.title).toBe(`${name} | BoreFence`);
    }
  );

  it('shows the 404 page for an unknown Service', () => {
    renderAt('/services/no-such-service');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });

  it('starts each Service page fresh when moving between Services', async () => {
    const user = userEvent.setup();
    renderAt('/services/gates');
    await user.click(screen.getByRole('button', { name: /^View image 7 of 7$/ }));
    expect(screen.getByText('7 / 7')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Services' }));
    await user.click(within(document.getElementById('services-menu')).getByRole('link', { name: 'Sheds' }));

    expect(screen.getByRole('heading', { level: 1, name: 'Sheds' })).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('shows the 404 page for an unknown URL', () => {
    renderAt('/no-such-page');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });

  it.each([
    ['/', 'BoreFence | Garden Fencing and Railings'],
    ['/contact', 'Contact us | BoreFence'],
    ['/services/railings', 'Railings | BoreFence'],
    ['/no-such-page', 'Page not found | BoreFence'],
  ])('gives %s its own page title', (path, title) => {
    renderAt(path);
    expect(document.title).toBe(title);
  });
});
