import { changePassword, newPassword, resetPassword } from '../actions';
import { createFormSubmitSaga } from '../../forms/sagas';

export default [
  ...createFormSubmitSaga(resetPassword),
  ...createFormSubmitSaga(newPassword),
  ...createFormSubmitSaga(changePassword),
];
