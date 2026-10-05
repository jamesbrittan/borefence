import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import Gallery from './index';
import { findService, galleryImages } from '../../catalogue/services';

const fencing = galleryImages(findService('fencing'));
const counter = (n) => screen.getByText(`${n} / ${fencing.length}`);

const thumbnail = (n) => screen.getByRole('button', { name: new RegExp(`^View image ${n} of \\d+$`) });

describe('Gallery', () => {
  it('are real buttons, and the first starts pressed', () => {
    renderWithProviders(<Gallery images={fencing} />);
    expect(thumbnail(1).tagName).toBe('BUTTON');
    expect(thumbnail(1)).toHaveAttribute('aria-pressed', 'true');
    expect(thumbnail(2)).toHaveAttribute('aria-pressed', 'false');
  });

  it('change the main image with Enter', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery images={fencing} />);

    thumbnail(3).focus();
    await user.keyboard('{Enter}');

    expect(screen.getByText(/^3 \/ \d+$/)).toBeInTheDocument();
    expect(thumbnail(3)).toHaveAttribute('aria-pressed', 'true');
    expect(thumbnail(1)).toHaveAttribute('aria-pressed', 'false');
  });

  it('change the main image with Space', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery images={fencing} />);

    thumbnail(5).focus();
    await user.keyboard(' ');

    expect(screen.getByText(/^5 \/ \d+$/)).toBeInTheDocument();
  });

  it('can all be reached with Tab', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery images={fencing} />);

    thumbnail(1).focus();
    await user.tab();
    expect(thumbnail(2)).toHaveFocus();
  });

  it('shows the selected image with its catalogue alt text', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery images={fencing} />);

    expect(screen.getByRole('img', { name: fencing[0].alt })).toBeInTheDocument();
    await user.click(thumbnail(4));
    expect(screen.getByRole('img', { name: fencing[3].alt })).toBeInTheDocument();
    expect(screen.getByText(`4 / ${fencing.length}`)).toBeInTheDocument();
  });

  it('wraps around with the previous and next buttons', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery images={fencing} />);

    await user.click(screen.getByRole('button', { name: 'Previous image' }));
    expect(counter(fencing.length)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next image' }));
    expect(counter(1)).toBeInTheDocument();
  });

  it('steps through images with the arrow keys, keeping focus on the selected thumbnail', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery images={fencing} />);

    thumbnail(1).focus();
    await user.keyboard('{ArrowRight}{ArrowRight}');
    expect(counter(3)).toBeInTheDocument();
    expect(thumbnail(3)).toHaveFocus();

    await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}');
    expect(counter(fencing.length)).toBeInTheDocument();
    expect(thumbnail(fencing.length)).toHaveFocus();
  });

  it('hides the counter and previous/next buttons for a single image', () => {
    renderWithProviders(<Gallery images={fencing.slice(0, 1)} />);
    expect(screen.getByRole('img', { name: fencing[0].alt })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next image' })).not.toBeInTheDocument();
    expect(screen.queryByText('1 / 1')).not.toBeInTheDocument();
  });

  it('renders nothing for an empty gallery', () => {
    const { container } = renderWithProviders(<Gallery images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('does not change the photo when a thumbnail is merely hovered', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery images={fencing} />);

    await user.hover(thumbnail(5));
    expect(counter(1)).toBeInTheDocument();
    expect(thumbnail(1)).toHaveAttribute('aria-pressed', 'true');
  });
});
