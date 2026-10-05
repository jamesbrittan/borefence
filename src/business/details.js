// Business details: the facts about BoreFence that appear around the site
// (footer, About block, features, warranty list, page descriptions and the
// structured data search engines read). Change a phone number or claim here
// and every place that shows it follows.

export const business = {
  name: 'BoreFence',
  legalName: 'Borefence Ltd',
  url: 'https://borefence.co.uk',
  phones: [
    { label: 'Phone', display: '01633 526 247', international: '+441633526247' },
    { label: 'Mobile', display: '07780 002247', international: '+447780002247' },
  ],
  email: 'karen.howell@borefence.co.uk',
  area: {
    base: 'Newport',
    postcodes: ['NP', 'CF'],
    region: 'South East Wales',
  },
  yearsTrading: 16,
  wasteLicence: {
    authority: 'Cymru Natural Resources Wales',
    number: 'CBOU9164',
  },
  warranty: {
    installationYears: 1,
    manufacturerYears: 25,
    manufacturer: 'Climar Industries',
  },
};

export const telHref = (phone) => `tel:${phone.international}`;

// "the NP and CF postcodes"
export const postcodeList = () => {
  const { postcodes } = business.area;
  return postcodes.length > 1
    ? `${postcodes.slice(0, -1).join(', ')} and ${postcodes.at(-1)}`
    : postcodes[0];
};
