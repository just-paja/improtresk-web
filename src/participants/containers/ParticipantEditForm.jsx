import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import mapProgress from '../../containers/mapProgress'
import ParticipantEditForm from '../components/ParticipantEditForm'

import { getTeamOptions, getTeamsProgress, getParticipantEditValues } from '../selectors'
import { participantEdit, teamsRequired } from '../actions'
import { changePasswordValidator } from '../validators'

const mapStateToProps = state => ({
  initialValues: getParticipantEditValues(state),
  teams: getTeamOptions(state)
})

const mapDispatchToProps = {
  onSubmit: participantEdit
}

const formContainer = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: participantEdit.form,
  validate: changePasswordValidator
})(ParticipantEditForm))

const container = mapProgress(formContainer, {
  progressSelector: getTeamsProgress,
  onResourceChange: teamsRequired
})

container.displayName = 'Connect(ReduxForm(ParticipantEditForm))'

export default container
