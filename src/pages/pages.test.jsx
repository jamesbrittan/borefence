import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../test/utils';
import Contact from './Contact';
import NotFound from './NotFound';
import { business } from '../business/details';
import { services, servicePath } from '../catalogue/services';

describe('Contact page', () => {
  it('leads with a page heading, then the quote form as a section', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByRole('heading', { level: 1, name: 'Contact us' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /get a free quote/i })).toBeInTheDocument();
  });

  it('shows every way to get in touch, as links that dial or email', () => {
    renderWithProviders(<Contact />);
    for (const phone of business.phones) {
      expect(screen.getByRole('link', { name: phone.display })).toHaveAttribute('href', `tel:${phone.international}`);
    }
    expect(screen.getByRole('link', { name: business.email })).toHaveAttribute('href', `mailto:${business.email}`);
    expect(screen.getByText(new RegExp(`covering the .* ${business.area.region}`))).toBeInTheDocument();
  });
});

describe('404 page', () => {
  it('offers the Services and a phone number to a lost visitor', () => {
    renderWithProviders(<NotFound />);
    const nav = screen.getByRole('navigation', { name: 'Our services' });
    expect(within(nav).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(services.map(servicePath));
    expect(screen.getByRole('link', { name: business.phones[0].display })).toHaveAttribute('href', `tel:${business.phones[0].international}`);
  });
});
