import Crossing from 'crossing';

export const urlTable = {
  home: '/',
  accomodation: '/pro-ucastniky/ubytovani',
  food: '/pro-ucastniky/jidlo',
  fees: '/pro-ucastniky/poplatky',
  tips: '/pro-ucastniky/tipy',
  conditions: '/pro-ucastniky/podminky',
  location: '/pro-ucastniky/lokace',
  workshops: '/workshopy',
  'workshops:item': '/workshopy/:slug',
  drive: '/jizdomat',
  'news:item': '/novinky/:slug',
  signup: '/prihlaska',
  schedule: '/program',
  contact: '/kontakt',
  'archive:year': '/archiv/:slug',
};

export const resolver = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'));
resolver.load(urlTable);

export function idFromSlug(slug) {
  return slug ? slug.split('-').pop() : null;
}

export function reverse(url, params) {
  return resolver.get(url, params);
}
