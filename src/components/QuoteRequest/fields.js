// The quote request form's fields. Netlify Forms only stores fields that are
// declared in the hidden form in index.html; a test checks that form matches
// what QuoteRequest renders, so a new field can't be silently dropped.

export const QUOTE_FORM_NAME = 'contact';

// `messages` are shown under a field when it fails validation on submit
export const QUOTE_FIELDS = [
  {
    name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name', required: true,
    messages: { missing: 'Enter your name' },
  },
  {
    name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'Your email', required: true,
    messages: { missing: 'Enter your email address', invalid: 'Enter an email address like name@example.com' },
  },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel', placeholder: 'Your phone number' },
  {
    name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message', required: true,
    messages: { missing: "Tell us what you'd like a quote for" },
  },
];

export const emptyValues = () => Object.fromEntries(QUOTE_FIELDS.map((field) => [field.name, '']));

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns { fieldName: message } for every field that fails; {} when valid
export const validate = (values) =>
  Object.fromEntries(
    QUOTE_FIELDS.flatMap(({ name, type, required, messages }) => {
      const value = values[name].trim();
      if (required && !value) return [[name, messages.missing]];
      if (type === 'email' && value && !EMAIL.test(value)) return [[name, messages.invalid]];
      return [];
    })
  );
