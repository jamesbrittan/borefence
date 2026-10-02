// Submit adapters for quote requests. An adapter takes the submitted fields
// ({ 'form-name': 'contact', name: '…', … }) and resolves once they're
// stored, or rejects if they weren't.

// Netlify Forms: POST url-encoded fields to any page on the site.
export const netlifySubmit = async (fields) => {
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
  });
  if (!response.ok) {
    throw new Error(`Quote request failed with status ${response.status}`);
  }
};

// In-memory, for tests: records submissions, or fails every time.
export const inMemorySubmit = ({ fail = false } = {}) => {
  const submit = async (fields) => {
    if (fail) throw new Error('Quote request failed');
    submit.submissions.push(fields);
  };
  submit.submissions = [];
  return submit;
};
