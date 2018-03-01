import Crossing from 'crossing';

const cs = {
  accomodation: '/ubytovani',
  archiveYearDetail: '/archiv/:slug',
  conditions: '/podminky',
  contact: '/kontakt',
  fees: '/poplatky',
  food: '/jidlo',
  home: '/',
  location: '/lokace',
  newsDetail: '/novinky/:slug',
  participantConfirmOrder: '/ucastnik/potvrzeni',
  participantForgottenPassword: '/zapomenute-heslo',
  participantHome: '/ucastnik',
  participantChangeFood: '/ucastnik/vyber-jidla',
  participantChangePassword: '/ucastnik/zmena-hesla',
  participantChangeWorkshop: '/ucastnik/zmena-workshopu',
  participantNewPassword: '/nove-heslo',
  performerDetail: '/ucinkujici/:slug',
  schedule: '/program',
  signup: '/prihlaska',
  tips: '/tipy',
  workshopDetail: '/workshopy/:slug',
  workshops: '/workshopy',
};

const en = {
  accomodation: '/accomodation',
  archiveYearDetail: '/archive/:slug',
  conditions: '/conditions',
  contact: '/contact',
  fees: '/fees',
  food: '/food',
  home: '/',
  location: '/location',
  newsDetail: '/new/:slug',
  participantConfirmOrder: '/participant/confirmation',
  participantForgottenPassword: '/forgotten-password',
  participantHome: '/participant',
  participantChangeFood: '/participant/food-choice',
  participantChangePassword: '/participant/change-password',
  participantChangeWorkshop: '/participant/change-workshop',
  participantNewPassword: '/new-password',
  performerDetail: '/ucinkujici/:slug',
  schedule: '/schedule',
  signup: '/signup',
  tips: '/tips',
  workshopDetail: '/workshops/:slug',
  workshops: '/workshopy',
};

const resolver = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'));
const getLangUrlName = (lang, urlName) => `${lang}:${urlName}`;
const urlMap = {
  cs,
  en,
};

export function getAvailableLangs() {
  return Object.keys(urlMap);
}

export function idFromSlug(slug) {
  return slug ? slug.split('-').pop() : null;
}

export function reverse(lang, urlName, params) {
  return resolver.get(getLangUrlName(lang, urlName), params);
}

export function getUrlPattern(lang, name) {
  if (urlMap[lang] && urlMap[lang][name]) {
    return `/${lang}${urlMap[lang][name]}`;
  }
  return null;
}

const urlTable = Object.keys(urlMap).reduce((map, lang) => ({
  ...map,
  ...Object.keys(urlMap[lang]).reduce((urls, urlName) => ({
    ...urls,
    [getLangUrlName(lang, urlName)]: `/${lang}${urlMap[lang][urlName]}`,
  }), {}),
}), {
  root: '/',
});

resolver.load(urlTable);