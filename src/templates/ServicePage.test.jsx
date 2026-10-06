import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../test/utils';
import ServicePage from './ServicePage';
import { findService, services, servicePath } from '../catalogue/services';
import { business } from '../business/details';

const gates = findService('gates');

describe('ServicePage', () => {
  it('offers a quote link that jumps to the quote form, and a click-to-call link', () => {
    const { container } = renderWithProviders(<ServicePage service={gates} />);
    const quoteLink = screen.getByRole('link', { name: 'Get a free quote' });
    const target = container.querySelector(quoteLink.getAttribute('href'));
    expect(target).not.toBeNull();
    expect(within(target).getByRole('button', { name: /request a free quote/i })).toBeInTheDocument();

    const phone = business.phones[0];
    expect(screen.getByRole('link', { name: `Call ${phone.display}` })).toHaveAttribute('href', `tel:${phone.international}`);
  });

  it('links to every other Service, but not itself', () => {
    renderWithProviders(<ServicePage service={gates} />);
    const section = screen.getByRole('region', { name: 'Other services' });
    const hrefs = within(section).getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(services.filter((s) => s.slug !== 'gates').map(servicePath));
  });
});
