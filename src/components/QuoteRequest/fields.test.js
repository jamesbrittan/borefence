import { describe, it, expect } from 'vitest';
import { validate, emptyValues } from './fields';

describe('validate', () => {
  it('requires name, email and message but not phone', () => {
    expect(Object.keys(validate(emptyValues()))).toEqual(['name', 'email', 'message']);
  });

  it('ignores surrounding spaces', () => {
    expect(validate({ ...emptyValues(), name: '   ' }).name).toBe('Enter your name');
  });

  it.each(['sam', 'sam@', 'sam@example', 'sam @example.com'])('rejects %s as an email address', (email) => {
    expect(validate({ name: 'Sam', email, phone: '', message: 'Hi' })).toEqual({
      email: 'Enter an email address like name@example.com',
    });
  });

  it('accepts a complete request', () => {
    expect(validate({ name: 'Sam', email: 'sam@example.com', phone: '', message: 'Hi' })).toEqual({});
  });
});
