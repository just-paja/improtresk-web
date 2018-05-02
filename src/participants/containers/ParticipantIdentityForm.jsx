import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import ParticipantIdentityForm from '../components/ParticipantIdentityForm';

import { getParticipantIdentityValues } from '../selectors';
import { identityEdit } from '../actions';
import { identityValidator } from '../validators';

const mapStateToProps = state => ({
  initialValues: getParticipantIdentityValues(state),
});

const mapDispatchToProps = {
  onSubmit: identityEdit,
};

const container = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: identityEdit.form,
  validate: identityValidator,
})(ParticipantIdentityForm));

container.displayName = 'Connect(ReduxForm(ParticipantIdentityForm))';

export default container;
