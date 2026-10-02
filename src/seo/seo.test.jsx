import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Footer from '../components/Footer/Footer';
import { renderWithProviders } from '../test/utils';
import { business } from '../business/details';
import { services, servicePath } from '../catalogue/services';
import { localBusinessSchema } from './structuredData';

const renderAt = (path) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

const head = () => ({
  descriptions: [...document.head.querySelectorAll('meta[name="description"]')].map((m) => m.content),
  canonicals: [...document.head.querySelectorAll('link[rel="canonical"]')].map((l) => l.getAttribute('href')),
  robots: document.head.querySelector('meta[name="robots"]')?.content,
});

describe('per-page SEO', () => {
  const pages = ['/', '/contact', ...services.map(servicePath)];

  it.each(pages)('%s has one description and a canonical URL', (path) => {
    renderAt(path);
    const { descriptions, canonicals, robots } = head();
    expect(descriptions).toHaveLength(1);
    expect(descriptions[0].length).toBeGreaterThan(50);
    expect(descriptions[0].length).toBeLessThanOrEqual(160);
    expect(canonicals).toEqual([`${business.url}${path}`]);
    expect(robots).toBeUndefined();
  });

  it('gives every page a different description', () => {
    const seen = pages.map((path) => {
      const { unmount } = renderAt(path);
      const [description] = head().descriptions;
      unmount();
      return description;
    });
    expect(new Set(seen).size).toBe(pages.length);
  });

  it('keeps the 404 page out of search results', () => {
    renderAt('/no-such-page');
    expect(head().robots).toBe('noindex');
    expect(head().canonicals).toEqual([]);
  });

  it('adds LocalBusiness structured data to the home page', () => {
    renderAt('/');
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent)).toEqual(localBusinessSchema());
  });
});

describe('LocalBusiness structured data', () => {
  it('describes the business and every Service', () => {
    const data = localBusinessSchema();
    expect(data['@type']).toBe('HomeAndConstructionBusiness');
    expect(data.telephone).toBe(business.phones[0].international);
    expect(data.address.addressLocality).toBe(business.area.base);
    expect(data.makesOffer.map((offer) => offer.itemOffered.name)).toEqual(services.map((s) => s.name));
  });
});

describe('Footer', () => {
  it('shows every contact detail from the business details', () => {
    renderWithProviders(<Footer />);
    for (const phone of business.phones) {
      expect(screen.getByRole('link', { name: phone.display })).toHaveAttribute('href', `tel:${phone.international}`);
    }
    expect(screen.getByRole('link', { name: business.email })).toHaveAttribute('href', `mailto:${business.email}`);
  });
});
