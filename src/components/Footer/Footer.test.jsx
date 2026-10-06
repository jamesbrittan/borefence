import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Footer from './Footer';
import { business } from '../../business/details';

describe('Footer', () => {
  it('labels each column by its visible heading', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByRole('region', { name: 'Contact Us' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Services' })).toBeInTheDocument();
  });

  it('shows each contact method as a label above its link', () => {
    renderWithProviders(<Footer />);
    const contact = screen.getByRole('region', { name: 'Contact Us' });
    const items = within(contact).getAllByRole('listitem');
    expect(items).toHaveLength(business.phones.length + 1);
    expect(items[0]).toHaveTextContent(`${business.phones[0].label}${business.phones[0].display}`);
  });

  it('ends with the copyright, company name and licence', () => {
    renderWithProviders(<Footer />);
    expect(
      screen.getByText(`© ${new Date().getFullYear()} ${business.legalName}. Trade Waste Licence ${business.wasteLicence.number}.`)
    ).toBeInTheDocument();
  });
});
