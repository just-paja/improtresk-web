import { createSelector } from 'reselect';

const getTextState = state => state.texts;

export const getText = (state, code) => createSelector(
  getTextState,
  (texts) => {
    if (texts[code] && texts[code].data && texts[code].data.text) {
      return texts[code].data.text;
    }

    return '';
  }
)(state);

export const readyTexts = (state, codes) => createSelector(
  getTextState,
  texts => codes.every(code => texts[code] && texts[code].ready)
)(state);
