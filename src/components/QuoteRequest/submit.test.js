import { describe, it, expect, vi, afterEach } from 'vitest';
import { netlifySubmit } from './submit';

describe('netlifySubmit', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('POSTs the fields url-encoded, as Netlify Forms expects', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetch);

    await netlifySubmit({ 'form-name': 'contact', name: 'Sam & Jo', message: 'Hi' });

    expect(fetch).toHaveBeenCalledWith('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'form-name=contact&name=Sam+%26+Jo&message=Hi',
    });
  });

  it('rejects when Netlify does not accept the submission', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(netlifySubmit({ 'form-name': 'contact' })).rejects.toThrow(/status 404/);
  });
});
