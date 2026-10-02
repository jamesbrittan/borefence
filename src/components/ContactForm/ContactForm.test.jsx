import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import ContactForm from './ContactForm';

const fillAndSubmit = async (user) => {
  await user.type(screen.getByLabelText(/name/i), 'Sam');
  await user.type(screen.getByLabelText(/email/i), 'sam@example.com');
  await user.type(screen.getByLabelText(/message/i), 'A quote for 10m of fencing please');
  await user.click(screen.getByRole('button', { name: /send message/i }));
};

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('marks the phone field as optional', () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByLabelText('Phone (optional)')).not.toBeRequired();
    expect(screen.getByLabelText('Name')).toBeRequired();
  });

  it('has always-present live regions, empty before submitting', () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.getByRole('alert')).toBeEmptyDOMElement();
  });

  it('announces success in the status region', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await fillAndSubmit(user);

    expect(await screen.findByRole('status')).toHaveTextContent(/thank you/i);
    expect(screen.getByRole('alert')).toBeEmptyDOMElement();
  });

  it('announces failure in the alert region', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await fillAndSubmit(user);

    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('can render its heading as the page h1', () => {
    renderWithProviders(<ContactForm headingLevel="h1" />);
    expect(screen.getByRole('heading', { level: 1, name: /get a free quote/i })).toBeInTheDocument();
  });
});
