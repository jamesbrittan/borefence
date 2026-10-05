import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import ServiceGallery from './index';

// jsdom never loads or fails images, so all 10 probed thumbnails are present.
const thumbnail = (n) => screen.getByRole('button', { name: new RegExp(`^View image ${n} of \\d+$`) });

describe('ServiceGallery thumbnails', () => {
  it('are real buttons, and the first starts pressed', () => {
    renderWithProviders(<ServiceGallery serviceName="fencing" />);
    expect(thumbnail(1).tagName).toBe('BUTTON');
    expect(thumbnail(1)).toHaveAttribute('aria-pressed', 'true');
    expect(thumbnail(2)).toHaveAttribute('aria-pressed', 'false');
  });

  it('change the main image with Enter', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ServiceGallery serviceName="fencing" />);

    thumbnail(3).focus();
    await user.keyboard('{Enter}');

    expect(screen.getByText(/^3 \/ \d+$/)).toBeInTheDocument();
    expect(thumbnail(3)).toHaveAttribute('aria-pressed', 'true');
    expect(thumbnail(1)).toHaveAttribute('aria-pressed', 'false');
  });

  it('change the main image with Space', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ServiceGallery serviceName="fencing" />);

    thumbnail(5).focus();
    await user.keyboard(' ');

    expect(screen.getByText(/^5 \/ \d+$/)).toBeInTheDocument();
  });

  it('can all be reached with Tab', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ServiceGallery serviceName="fencing" />);

    thumbnail(1).focus();
    await user.tab();
    expect(thumbnail(2)).toHaveFocus();
  });
});
