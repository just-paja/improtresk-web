import Crossing from 'crossing';

export const urlTable = {
  'archive:year': '/archiv/:slug',
  'news:item': '/novinky/:slug',
  'participant:home': '/ucastnik',
  'participant:confirm': '/ucastnik/potvrzeni',
  'participant:forgottenPassword': '/zapomenute-heslo',
  'participant:changePassword': '/ucastnik/zmena-hesla',
  'participant:changeWorkshop': '/ucastnik/zmena-workshopu',
  'participant:newPassword': '/nove-heslo',
  'performers:item': '/ucinkujici/:slug',
  'workshops:item': '/workshopy/:slug',
  accomodation: '/pro-ucastniky/ubytovani',
  conditions: '/pro-ucastniky/podminky',
  contact: '/kontakt',
  drive: '/jizdomat',
  fees: '/pro-ucastniky/poplatky',
  food: '/pro-ucastniky/jidlo',
  home: '/',
  location: '/pro-ucastniky/lokace',
  schedule: '/program',
  signup: '/prihlaska',
  tips: '/pro-ucastniky/tipy',
  workshops: '/workshopy',
};

export const resolver = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'));
resolver.load(urlTable);

export function idFromSlug(slug) {
  return slug ? slug.split('-').pop() : null;
}

export function reverse(url, params) {
  return resolver.get(url, params);
}
