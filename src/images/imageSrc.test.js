import { describe, it, expect, afterEach, vi } from 'vitest';
import { imageSrc, imageSrcSet } from './imageSrc';

const params = (url) => Object.fromEntries(new URL(url, 'https://example.com').searchParams);

describe('imageSrc', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('local adapter (vite dev / preview)', () => {
    it('returns the plain file path and ignores size', () => {
      // Netlify builds set VITE_IMAGE_CDN for the whole build, tests included
      vi.stubEnv('VITE_IMAGE_CDN', '');
      expect(imageSrc('fence_blue_s.jpg', { width: 600 })).toBe('/assets/images/fence_blue_s.jpg');
    });
  });

  describe('Netlify adapter', () => {
    const useNetlify = () => vi.stubEnv('VITE_IMAGE_CDN', 'netlify');

    it('routes through the Netlify Image CDN with the requested width', () => {
      useNetlify();
      const url = imageSrc('fence_blue_s.jpg', { width: 600 });
      expect(url.startsWith('/.netlify/images?')).toBe(true);
      expect(params(url)).toEqual({ url: '/assets/images/fence_blue_s.jpg', w: '600' });
    });

    it('passes height and fit for crops', () => {
      useNetlify();
      expect(params(imageSrc('railings/tops/ball_top.jpg', { width: 400, height: 300, fit: 'cover' })))
        .toEqual({ url: '/assets/images/railings/tops/ball_top.jpg', w: '400', h: '300', fit: 'cover' });
    });

    it('encodes paths with special characters so they survive the query string', () => {
      useNetlify();
      const url = imageSrc('tree-felling-&-stump-grinding/1.jpg', { width: 800 });
      expect(url).toContain('tree-felling-%26-stump-grinding');
      expect(params(url).url).toBe('/assets/images/tree-felling-&-stump-grinding/1.jpg');
    });

    it('omits size params that are not given', () => {
      useNetlify();
      expect(params(imageSrc('logo.png'))).toEqual({ url: '/assets/images/logo.png' });
    });
  });

  it('rejects fit values the CDN does not support', () => {
    expect(() => imageSrc('x.jpg', { width: 10, fit: 'crop' })).toThrow(/Unknown image fit "crop"/);
  });
});

describe('imageSrcSet', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('lists each width, scaling height to keep the aspect ratio', () => {
    vi.stubEnv('VITE_IMAGE_CDN', 'netlify');
    const entries = imageSrcSet('a.jpg', [400, 800], { width: 800, height: 600, fit: 'cover' }).split(', ');
    expect(entries).toHaveLength(2);
    const [url400, w400] = entries[0].split(' ');
    expect(w400).toBe('400w');
    expect(params(url400)).toMatchObject({ w: '400', h: '300', fit: 'cover' });
    expect(entries[1].endsWith(' 800w')).toBe(true);
  });
});
