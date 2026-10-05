import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../test/utils';
import Navigation from '../components/Navigation/Navigation';
import HeroSection from '../components/HeroSection/HeroSection';
import { services, servicePath, findService, galleryImages } from './services';

const IMAGES = join(process.cwd(), 'public', 'assets', 'images');

describe('Service catalogue', () => {
  it('has unique, URL-safe slugs', () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('finds Services by slug', () => {
    expect(findService('railings').name).toBe('Railings');
    expect(findService('no-such-service')).toBeUndefined();
  });

  describe.each(services.map((s) => [s.name, s]))('%s', (_name, service) => {
    it('has a gallery file on disk for every entry', () => {
      for (const { src } of galleryImages(service)) {
        expect(existsSync(join(IMAGES, src)), `missing public/assets/images/${src}`).toBe(true);
      }
    });

    it('lists every image in its folder, so new photos are not silently ignored', () => {
      const onDisk = readdirSync(join(IMAGES, service.imageFolder)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
      expect(service.gallery.map((g) => g.file).sort()).toEqual(onDisk.sort());
    });

    it('describes every gallery image with distinct alt text', () => {
      const alts = service.gallery.map((g) => g.alt);
      for (const alt of alts) expect(alt.trim().length).toBeGreaterThan(10);
      expect(new Set(alts).size).toBe(alts.length);
    });
  });

  it('puts every Service in the Services menu', () => {
    renderWithProviders(<Navigation />);
    const menu = screen.getByRole('list', { hidden: true });
    const hrefs = within(menu).getAllByRole('link', { hidden: true }).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(services.map(servicePath));
  });

  it('puts every Service in the hero links', () => {
    renderWithProviders(<HeroSection title="BoreFence" showServiceLinks />);
    for (const service of services) {
      expect(screen.getByRole('link', { name: service.name })).toHaveAttribute('href', servicePath(service));
    }
  });
});
