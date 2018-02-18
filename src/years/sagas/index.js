import yearArchive from './fetchYearArchive';
import yearCapacity from './fetchYearCapacity';
import yearConditions from './fetchYearConditions';
import yearList from './fetchYearList';

export * from './fetchYearArchive';
export * from './fetchYearCapacity';
export * from './fetchYearConditions';
export * from './fetchYearList';

export default [
  ...yearArchive,
  ...yearCapacity,
  ...yearConditions,
  ...yearList,
];
