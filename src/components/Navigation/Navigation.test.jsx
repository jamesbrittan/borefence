import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import Navigation from './Navigation';

const servicesButton = () => screen.getByRole('button', { name: 'Services' });

describe('Services dropdown (disclosure pattern)', () => {
  it('is a plain button named "Services" controlling a list of links, with no menu roles', () => {
    renderWithProviders(<Navigation />);
    const button = servicesButton();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'services-menu');
    // { hidden: true }: the closed list is visibility:hidden, which queries skip by default
    expect(screen.queryByRole('menu', { hidden: true })).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { hidden: true })).not.toBeInTheDocument();
    expect(screen.getByRole('list', { hidden: true })).toHaveAttribute('id', 'services-menu');
  });

  it('opens with Enter and lets Tab move through every link', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navigation />);

    servicesButton().focus();
    await user.keyboard('{Enter}');
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'true');

    for (const name of ['Fencing', 'Railings', 'Gates', 'Sheds', 'Tree Felling & Stump Grinding']) {
      await user.tab();
      expect(screen.getByRole('link', { name })).toHaveFocus();
    }
  });

  it('closes when focus leaves the links', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navigation />);

    await user.click(servicesButton());
    screen.getByRole('link', { name: 'Tree Felling & Stump Grinding' }).focus();
    await user.tab();

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveFocus();
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape and returns focus to the button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navigation />);

    await user.click(servicesButton());
    screen.getByRole('link', { name: 'Gates' }).focus();
    await user.keyboard('{Escape}');

    expect(servicesButton()).toHaveAttribute('aria-expanded', 'false');
    expect(servicesButton()).toHaveFocus();
  });

  it('closes after choosing a link', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navigation />);

    await user.click(servicesButton());
    await user.click(screen.getByRole('link', { name: 'Sheds' }));

    expect(servicesButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens on click only, not on hover', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navigation />);

    await user.hover(servicesButton());
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'false');

    await user.click(servicesButton());
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'true');

    // Moving the pointer away (e.g. diagonally towards a link) doesn't close it
    await user.unhover(servicesButton().parentElement);
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'true');

    await user.click(servicesButton());
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on a click outside it', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Navigation />
        <p>Page content</p>
      </>
    );

    await user.click(servicesButton());
    await user.click(screen.getByText('Page content'));

    expect(servicesButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape after opening with the mouse, even with focus elsewhere', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navigation />);

    await user.click(servicesButton());
    await user.hover(screen.getByRole('link', { name: 'Fencing' }));
    // Some browsers (Safari) don't focus a button on click
    servicesButton().blur();
    await user.keyboard('{Escape}');

    expect(servicesButton()).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Current page', () => {
  it('marks the current Service link and highlights "Services"', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navigation />, { route: '/services/gates' });

    await user.click(servicesButton());
    expect(screen.getByRole('link', { name: 'Gates' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Fencing' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Contact' })).not.toHaveAttribute('aria-current');
    expect(servicesButton()).toHaveStyle({ textDecoration: 'underline' });
  });

  it('marks "Contact" on the contact page', () => {
    renderWithProviders(<Navigation />, { route: '/contact' });

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page');
    expect(servicesButton()).not.toHaveStyle({ textDecoration: 'underline' });
  });
});
