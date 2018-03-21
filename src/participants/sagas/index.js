import participantPassword from './participantPassword';
import participant from './participant';
import signup from './signup';
import login from './login';
import teams from './teams';

export * from './participant';
export * from './teams';

export default [
  ...participantPassword,
  ...participant,
  ...signup,
  ...teams,
  ...login,
];
