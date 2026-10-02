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

  it('stays open when a mouse user hovers and then clicks "Services"', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navigation />);

    await user.hover(servicesButton());
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'true');
    await user.click(servicesButton());
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'true');

    await user.unhover(servicesButton().parentElement);
    expect(servicesButton()).toHaveAttribute('aria-expanded', 'false');
  });
});
