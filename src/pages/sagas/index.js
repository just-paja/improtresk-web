import fetchTexts from './fetchTexts';
import pageResources from './pageResources';

export * from './fetchTexts';
export * from './pageResources';

export default [
  ...pageResources,
  ...fetchTexts,
];
