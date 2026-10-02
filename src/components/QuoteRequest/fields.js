// The quote request form's fields. Netlify Forms only stores fields that are
// declared in the hidden form in index.html; a test checks that form matches
// what QuoteRequest renders, so a new field can't be silently dropped.

export const QUOTE_FORM_NAME = 'contact';

export const QUOTE_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'Your email', required: true },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel', placeholder: 'Your phone number' },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message', required: true },
];

export const emptyValues = () => Object.fromEntries(QUOTE_FIELDS.map((field) => [field.name, '']));
