import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import HeroSection from './HeroSection';
import { business } from '../../business/details';
import { services } from '../../catalogue/services';

describe('HeroSection', () => {
  it('lists the Services as a labelled set of links', () => {
    renderWithProviders(<HeroSection title="BoreFence" showServiceLinks />);
    const nav = screen.getByRole('navigation', { name: 'Our services' });
    expect(within(nav).getAllByRole('link')).toHaveLength(services.length);
  });

  it('offers a click-to-call link when asked', () => {
    renderWithProviders(<HeroSection title="BoreFence" showPhone />);
    const phone = business.phones[0];
    expect(screen.getByRole('link', { name: phone.display })).toHaveAttribute('href', `tel:${phone.international}`);
  });

  it('leaves out the links and phone line by default', () => {
    renderWithProviders(<HeroSection title="BoreFence" />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
