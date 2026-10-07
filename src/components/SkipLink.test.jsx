import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { MAIN_CONTENT_ID } from './SkipLink';
import { services, servicePath } from '../catalogue/services';

const renderAt = (path) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

describe('Skip link', () => {
  it('is the first thing a keyboard user reaches', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.tab();
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveFocus();
  });

  it.each(['/', '/contact', ...services.map(servicePath), '/no-such-page'])(
    'has a focusable main content target on %s',
    (path) => {
      renderAt(path);
      const main = document.getElementById(MAIN_CONTENT_ID);
      expect(main?.tagName).toBe('MAIN');
      expect(main).toHaveAttribute('tabindex', '-1');
      expect(document.querySelectorAll('main')).toHaveLength(1);
    }
  );
});

describe('Logo', () => {
  it('names the link by where it goes', () => {
    renderAt('/contact');
    expect(screen.getByRole('link', { name: 'BoreFence home' })).toHaveAttribute('href', '/');
  });
});
