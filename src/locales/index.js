import defaultCs from './cs'
import defaultEn from './en'

import * as accomodation from '../accomodation/locales'
import * as food from '../food/locales'
import * as forms from '../forms/locales'
import * as news from '../news/locales'
import * as orders from '../orders/locales'
import * as pages from '../pages/locales'
import * as participants from '../participants/locales'
import * as polls from '../polls/locales'
import * as roommates from '../roommates/locales'
import * as schedule from '../schedule/locales'
import * as workshops from '../workshops/locales'
import * as years from '../years/locales'

const modules = [
  accomodation,
  food,
  forms,
  news,
  orders,
  pages,
  participants,
  polls,
  roommates,
  schedule,
  workshops,
  years
]

const buildLanguage = (lang, defaultMessages) => modules.reduce((aggr, module) => ({
  ...aggr,
  ...module[lang]
}), defaultMessages)

export const cs = buildLanguage('cs', defaultCs)
export const en = buildLanguage('en', defaultEn)
