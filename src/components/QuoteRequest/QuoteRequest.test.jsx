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
  await user.click(screen.getByRole('button', { name: /request a free quote/i }));
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

  describe('validation', () => {
    it('shows an error under each missing field, focuses the first, and sends nothing', async () => {
      const submit = inMemorySubmit();
      const user = userEvent.setup();
      renderWithProviders(<QuoteRequest submit={submit} />);

      await user.click(screen.getByRole('button', { name: /request a free quote/i }));

      expect(submit.submissions).toEqual([]);
      const name = screen.getByLabelText('Name');
      expect(name).toHaveFocus();
      expect(name).toHaveAttribute('aria-invalid', 'true');
      expect(name).toHaveAccessibleDescription('Enter your name');
      expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Enter your email address');
      expect(screen.getByLabelText('Message')).toHaveAccessibleDescription("Tell us what you'd like a quote for");
      expect(screen.getByLabelText('Phone (optional)')).not.toHaveAttribute('aria-invalid');
    });

    it('explains a badly formatted email address', async () => {
      const user = userEvent.setup();
      renderWithProviders(<QuoteRequest submit={inMemorySubmit()} />);
      await user.type(screen.getByLabelText('Name'), 'Sam');
      await user.type(screen.getByLabelText('Email'), 'sam@example');
      await user.type(screen.getByLabelText('Message'), 'Quote please');
      await user.click(screen.getByRole('button', { name: /request a free quote/i }));

      expect(screen.getByLabelText('Email')).toHaveFocus();
      expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Enter an email address like name@example.com');
    });

    it('clears an error as soon as the field is fixed', async () => {
      const user = userEvent.setup();
      renderWithProviders(<QuoteRequest submit={inMemorySubmit()} />);
      await user.click(screen.getByRole('button', { name: /request a free quote/i }));
      await user.type(screen.getByLabelText('Name'), 'S');

      expect(screen.getByLabelText('Name')).not.toHaveAttribute('aria-invalid');
      expect(screen.queryByText('Enter your name')).not.toBeInTheDocument();
    });
  });

  it('says how the details will be used, next to the button', () => {
    renderWithProviders(<QuoteRequest />);
    expect(screen.getByText(/only use your details to reply to your enquiry/i)).toBeInTheDocument();
  });
});
