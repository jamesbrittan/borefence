import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import QuoteRequest from './QuoteRequest';
import { inMemorySubmit } from './submit';

const fillAndSubmit = async (user) => {
  await user.type(screen.getByLabelText('Name'), 'Sam');
  await user.type(screen.getByLabelText('Email'), 'sam@example.com');
  await user.type(screen.getByLabelText('Message'), 'A quote for 10m of fencing please');
  await user.click(screen.getByRole('button', { name: /send message/i }));
};

describe('QuoteRequest', () => {
  it('marks the phone field as optional', () => {
    renderWithProviders(<QuoteRequest />);
    expect(screen.getByLabelText('Phone (optional)')).not.toBeRequired();
    expect(screen.getByLabelText('Name')).toBeRequired();
  });

  it('tells browsers what each field is for, so they can autofill it', () => {
    renderWithProviders(<QuoteRequest />);
    expect(screen.getByLabelText('Name')).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByLabelText('Email')).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByLabelText('Phone (optional)')).toHaveAttribute('autocomplete', 'tel');
  });

  it('has always-present live regions, empty before submitting', () => {
    renderWithProviders(<QuoteRequest />);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.getByRole('alert')).toBeEmptyDOMElement();
  });

  it('sends every field, including which page it came from', async () => {
    const submit = inMemorySubmit();
    const user = userEvent.setup();
    renderWithProviders(<QuoteRequest submit={submit} />, { route: '/services/gates' });

    await fillAndSubmit(user);

    expect(submit.submissions).toEqual([
      {
        'form-name': 'contact',
        'form-source': '/services/gates',
        'bot-field': '',
        name: 'Sam',
        email: 'sam@example.com',
        phone: '',
        message: 'A quote for 10m of fencing please',
      },
    ]);
  });

  it('announces success in the status region and clears the form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<QuoteRequest submit={inMemorySubmit()} />);

    await fillAndSubmit(user);

    expect(await screen.findByRole('status')).toHaveTextContent(/thank you/i);
    expect(screen.getByRole('alert')).toBeEmptyDOMElement();
    expect(screen.getByLabelText('Name')).toHaveValue('');
  });

  it('announces failure in the alert region and keeps what was typed', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    renderWithProviders(<QuoteRequest submit={inMemorySubmit({ fail: true })} />);

    await fillAndSubmit(user);

    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.getByLabelText('Name')).toHaveValue('Sam');
  });

  it('can render its heading as the page h1', () => {
    renderWithProviders(<QuoteRequest headingLevel="h1" />);
    expect(screen.getByRole('heading', { level: 1, name: /get a free quote/i })).toBeInTheDocument();
  });

  it('gives each form on a page its own field ids', () => {
    renderWithProviders(
      <>
        <QuoteRequest />
        <QuoteRequest />
      </>
    );
    const ids = screen.getAllByLabelText('Name').map((input) => input.id);
    expect(new Set(ids).size).toBe(2);
  });
});
