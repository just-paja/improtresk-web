import moment from 'moment-timezone';

import { all, call, takeEvery, put, select } from 'redux-saga/effects';
import { addTranslationForLanguage, initialize, setActiveLanguage } from 'react-localize-redux';

import { logWarning } from '../clientLogger';

import * as actions from '../constants';
import * as locales from '../locales';

import { getLang, getPreferredLanguages } from '../selectors/locales';

const getLangFromLocale = (locale) => {
  if (locale) {
    const [lang] = locale.replace('_').split('-');
    return lang;
  }
  return null;
};

const getTerritoryFromLocale = (locale) => {
  if (locale) {
    const localeArray = locale.replace('_').split('-');
    return localeArray[1] || null;
  }
  return null;
};

const getIsAvailable = availableLangs => locale =>
  availableLangs.indexOf(getLangFromLocale(locale)) !== -1;

export const getPreferredLanguage = (availableLangs, defaultLang, preferredLangs) => {
  const resolvedLang = preferredLangs.find(getIsAvailable(availableLangs));
  return resolvedLang || defaultLang;
};

export function* selectedLanguageChanged(action) {
  const lang = getLangFromLocale(action.language);
  const territory = getTerritoryFromLocale(action.language);
  const nextLang = locales[lang] ? lang : 'cs';
  const locale = territory ? `${nextLang}-${territory}` : nextLang;
  moment.locale(locale);
  yield put(setActiveLanguage(lang));
}

export function* selectLang(action) {
  const availableLangs = Object.keys(locales);
  // const currentLang = yield select(getLang);
  const language = getPreferredLanguage(availableLangs, 'cs', action.languages);
  yield put({
    type: actions.SESSION_SET_LANGUAGE,
    language,
  });
  yield call(selectedLanguageChanged, { language });
}

export function* selectDefaultLang() {
  const languages = yield select(getPreferredLanguages);
  yield call(selectLang, { languages });
}

export function* watchLanguageChanged() {
  yield takeEvery(
    actions.LOCALE_CHANGED,
    selectedLanguageChanged
  );
}

export function* checkRouteLanguageChange(action) {
  const activeLang = yield select(getLang);
  const nextLang = action.payload.pathname.split('/')[1];
  if (activeLang !== nextLang) {
    yield call(selectLang, { languages: [nextLang] });
  }
}

export function* watchLanguagePreferences() {
  yield takeEvery(
    actions.LOCALE_PREFERENCES_CHANGED,
    selectLang
  );
}

export function* initLocales() {
  const languageList = Object.keys(locales);
  yield put(initialize(languageList, {
    missingTranslationCallback: (key, languageCode) => {
      logWarning(`Missing translation for ${languageCode}.${key}`);
    },
  }));
  yield all(languageList.map(lang => put(addTranslationForLanguage(locales[lang], lang))));
  yield call(selectDefaultLang);
}

export function* watchAppMounted() {
  yield takeEvery(actions.APP_MOUNTED, initLocales);
}

export function* watchRouteChange() {
  yield takeEvery('@@router/LOCATION_CHANGE', checkRouteLanguageChange);
}

export default [
  watchAppMounted,
  watchLanguageChanged,
  watchLanguagePreferences,
  watchRouteChange,
];
