import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { renderWithProviders } from '../../test/utils';
import QuoteRequest from './QuoteRequest';
import { QUOTE_FORM_NAME } from './fields';

// Netlify Forms reads the hidden form in index.html at deploy time and only
// stores the fields declared there. If the React form sends a field that
// isn't declared, Netlify silently drops it (which is how form-source was
// being lost).

const detectionForm = () => {
  const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.querySelector(`form[name="${QUOTE_FORM_NAME}"]`);
};

const fieldNames = (form) =>
  [...form.querySelectorAll('input[name], textarea[name], select[name]')]
    .map((el) => el.getAttribute('name'))
    .filter((name) => name !== 'form-name') // routing field Netlify adds itself
    .sort();

describe('Netlify form detection (index.html)', () => {
  it('declares the quote form for Netlify', () => {
    const form = detectionForm();
    expect(form).not.toBeNull();
    expect(form.hasAttribute('netlify')).toBe(true);
  });

  it('declares exactly the fields the quote form sends', () => {
    const { container } = renderWithProviders(<QuoteRequest />);
    expect(fieldNames(detectionForm())).toEqual(fieldNames(container.querySelector('form')));
  });

  it('uses the same honeypot field', () => {
    const { container } = renderWithProviders(<QuoteRequest />);
    expect(detectionForm().getAttribute('netlify-honeypot')).toBe(
      container.querySelector('form').getAttribute('netlify-honeypot')
    );
  });
});
