import login from './login'
import participant from './participant'
import participantEdit from './participantEdit'
import participantPassword from './participantPassword'
import signup from './signup'
import teams from './teams'

export * from './participant'
export * from './teams'

export default [
  ...login,
  ...participant,
  ...participantEdit,
  ...participantPassword,
  ...signup,
  ...teams
]
