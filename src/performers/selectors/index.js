import { getProgress, getProp, isRequired, transformData } from 'react-saga-rest';

export const aggregatePerformerFrontImage = photos => (
  photos[0] ? photos[0].image : null
);

export const aggregatePerformerData = performer => (
  performer && performer.photos ? {
    ...performer,
    frontImage: aggregatePerformerFrontImage(performer.photos),
  } : performer
);

export const getPerformersDetailState = state => state.performers.detail;
export const getPerformersListState = state => state.performers.list;

export const getPerformerDetailProgress = getProgress(getPerformersDetailState);
export const getPerformerListProgress = getProgress(getPerformersListState);

export const getPerformerDetailId = getProp(getPerformersDetailState, 'id');
export const isPerformerListRequired = isRequired(getPerformersListState);
export const isPerformerDetailRequired = isRequired(getPerformersDetailState);

export const getPerformerDetail = transformData(getPerformersDetailState, [
  aggregatePerformerData,
]);

export const getPerformerList = transformData(getPerformersListState, [
  aggregatePerformerData,
]);
