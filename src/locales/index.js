import defaultCs from './cs';
import defaultEn from './en';

import * as accomodation from '../accomodation/locales';
import * as forms from '../forms/locales';
import * as orders from '../orders/locales';
import * as pages from '../pages/locales';
import * as participants from '../participants/locales';
import * as polls from '../polls/locales';
import * as workshops from '../workshops/locales';

const modules = [
  accomodation,
  forms,
  orders,
  participants,
  pages,
  polls,
  workshops,
];

const buildLanguage = (lang, defaultMessages) => modules.reduce((aggr, module) => ({
  ...aggr,
  ...module[lang],
}), defaultMessages);

export const cs = buildLanguage('cs', defaultCs);
export const en = buildLanguage('en', defaultEn);