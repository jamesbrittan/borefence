import { business } from '../business/details';
import { services, servicePath } from '../catalogue/services';

// schema.org LocalBusiness data so search engines can show BoreFence's
// contact details and services for local searches.
export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: business.name,
  legalName: business.legalName,
  url: business.url,
  logo: `${business.url}/assets/images/logo.png`,
  telephone: business.phones[0].international,
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: business.area.base,
    addressRegion: business.area.region,
    addressCountry: 'GB',
  },
  areaServed: [business.area.base, business.area.region],
  makesOffer: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: service.name, url: `${business.url}${servicePath(service)}` },
  })),
});
