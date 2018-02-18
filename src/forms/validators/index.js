import changeFood from './changeFood';
import changePassword from './changePassword';
import changeWorkshop from './changeWorkshop';
import login from './login';
import newPassword from './newPassword';
import order from './order';
import resetPassword from './resetPassword';
import signup from './signup';

const validators = {
  changeFood,
  changePassword,
  changeWorkshop,
  login,
  newPassword,
  order,
  resetPassword,
  signup,
};

export {
  changeFood,
  changePassword,
  changeWorkshop,
  login,
  newPassword,
  order,
  resetPassword,
  signup,
};

export default form => validators[form];
