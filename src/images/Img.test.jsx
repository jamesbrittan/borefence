import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Img from './Img';

describe('Img', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders a responsive image with the largest width as the fallback src', () => {
    vi.stubEnv('VITE_IMAGE_CDN', 'netlify');
    render(<Img path="fence_blue_s.jpg" widths={[400, 900, 600]} sizes="50vw" alt="A blue fence" loading="lazy" />);
    const img = screen.getByRole('img', { name: 'A blue fence' });
    expect(img.getAttribute('src')).toContain('w=900');
    expect(img.getAttribute('srcset').split(', ')).toHaveLength(3);
    expect(img).toHaveAttribute('sizes', '50vw');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
