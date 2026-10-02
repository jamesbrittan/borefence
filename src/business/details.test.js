import { describe, it, expect } from 'vitest';
import { business, telHref, postcodeList } from './details';

describe('business details', () => {
  it.each(business.phones.map((phone) => [phone.label, phone]))(
    '%s number dials the number it displays',
    (_label, phone) => {
      const displayed = phone.display.replace(/\s/g, '');
      expect(phone.international).toMatch(/^\+44\d{10}$/);
      expect(`0${phone.international.slice(3)}`).toBe(displayed);
      expect(telHref(phone)).toBe(`tel:${phone.international}`);
    }
  );

  it('has a valid email address and site URL', () => {
    expect(business.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(business.url).toMatch(/^https:\/\/[^/]+$/);
  });

  it('lists postcode areas in plain English', () => {
    expect(postcodeList()).toBe('NP and CF');
  });
});
