import * as constants from '../constants'

export const vote = (survey, answer) => ({
  type: constants.POLL_VOTE,
  survey,
  answer
})

export default { vote }
