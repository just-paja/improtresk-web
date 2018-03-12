import { getData, getProgress, isRequired } from 'react-saga-rest';
import { getForm } from '../../forms/selectors';

export const getParticipantDetailState = state => state.participants.detail;

export const getParticipantDetail = getData(getParticipantDetailState);
export const getParticipantProgress = getProgress(getParticipantDetailState);
export const isParticipantRequired = isRequired(getParticipantDetailState);

export const getChangePasswordForm = getForm('changePassword');
export const getNewPasswordForm = getForm('newPassword');
export const getResetPasswordForm = getForm('resetPassword');
