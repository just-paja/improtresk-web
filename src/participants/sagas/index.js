import participantPassword from './participantPassword';
import participant from './participant';
import signup from './signup';
import teams from './teams';

export * from './participantPassword';
export * from './participant';
export * from './signup';
export * from './teams';

export default [
  ...participantPassword,
  ...participant,
  ...signup,
  ...teams,
];
