import fetchYearArchive from './fetchYearArchive';
import fetchYearCapacity from './fetchYearCapacity';
import fetchYearListDefault from './fetchYearList';
import fetchYearRules from './fetchYearRules';

export * from './fetchYearArchive';
export * from './fetchYearCapacity';
export * from './fetchYearList';

export default [
  ...fetchYearArchive,
  ...fetchYearCapacity,
  ...fetchYearListDefault,
  ...fetchYearRules,
];
