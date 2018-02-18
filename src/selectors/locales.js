import { createSelector } from 'reselect';

const getSessionState = state => state.session;
const getServerState = state => state.server;

export const getLang = createSelector(
  getSessionState,
  state => (state.locale ? state.locale.split('-')[0] : 'cs')
);

export const getPathLang = path => path.split('/')[1];

export const getPreferredLanguages = createSelector(
  getServerState,
  (server) => {
    let languages = server.acceptsLanguages || [];
    let pathLang = server.pathLang || null;

    if (typeof window !== 'undefined' && window) {
      if (window.location) {
        pathLang = getPathLang(window.location.href);
      }

      if (window.navigator) {
        if (window.navigator.languages) {
          languages = languages.concat(window.navigator.languages);
        } else if (window.navigator.language) {
          languages.push(window.navigator.language);
        }
      }
    }
    if (pathLang) {
      const sameLangIndex = languages.findIndex(lang => lang.indexOf(pathLang) === 0);
      if (sameLangIndex === -1) {
        languages.unshift(pathLang);
      } else {
        const mainLang = languages.splice(sameLangIndex, 1);
        languages.unshift(mainLang[0]);
      }
    }
    return languages;
  }
);
