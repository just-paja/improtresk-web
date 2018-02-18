import { createSelector } from 'reselect';
import { getProgress, isRequired } from 'react-saga-rest';

export const getTextState = code => (state) => {
  if (state.texts.list && state.texts.list[code]) {
    return state.texts.list[code];
  }
  return null;
};

export const getText = code => createSelector(
  getTextState(code),
  (textState) => {
    if (textState && textState.data && textState.data.text) {
      return textState.data.text;
    }
    return null;
  }
);

export const getTextProgress = (...codes) => getProgress(...codes.map(getTextState));

export const isTextRequired = code => isRequired(getTextState(code));
