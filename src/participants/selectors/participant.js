import { getData, getProgress, isRequired } from 'react-saga-rest';

export const getParticipantDetailState = state => state.participants.detail;

export const getParticipantDetail = getData(getParticipantDetailState);
export const getParticipantProgress = getProgress(getParticipantDetailState);
export const isParticipantRequired = isRequired(getParticipantDetailState);
