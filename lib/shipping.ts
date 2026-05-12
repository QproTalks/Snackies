export const shippingOptions = [
  {
    id: 'nl_standard',
    label: 'Netherlands standard parcel',
    amount: 495,
    countries: ['NL'],
    note: 'Free shipping'
  },

  {
    id: 'be_de_lu',
    label: 'Belgium/Germany/Luxembourg parcel',
    amount: 895,
    countries: ['BE', 'DE', 'LU'],
    note: 'Neighbouring EU shipping'
  },

  {
    id: 'eu_standard',
    label: 'EU standard parcel',
    amount: 1295,
    countries: [
      'FR','ES','IT','AT','IE','PT','DK','SE',
      'FI','PL','CZ','SK','HU','RO','BG',
      'HR','SI','EE','LV','LT','GR'
    ],
    note: 'European shipping'
  },

  {
    id: 'world_standard',
    label: 'Worldwide parcel',
    amount: 1995,
    countries: [
      'US','GB','CA','AU','CN','JP','KR',
      'MX','BR','CH','NO','TR','AE','SG','NZ'
    ],
    note: 'International shipping'
  }
];

export const allowedShippingCountries = Array.from(
  new Set(shippingOptions.flatMap(s => s.countries))
);

// FREE SHIPPING FUNCTION
export function getShippingPrice(country: string, subtotal: number) {

  // Free shipping Netherlands
  if (country === 'NL' && subtotal >= 0) {
    return 0;
  }

  const option = shippingOptions.find(s =>
    s.countries.includes(country)
  );

  return option ? option.amount : 1995;
}
