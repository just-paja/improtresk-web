import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { login } from '../actions';
import { loginValidator } from '../validators';

import LoginForm from '../components/LoginForm';


const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: login.form,
  validate: loginValidator,
})(LoginForm));
