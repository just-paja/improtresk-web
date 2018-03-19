import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import NewPasswordPage from './components/NewPasswordPage';

import { formDefine } from '../forms/actions';

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
});

const mapDispatchToProps = {
  onMount: token => formDefine('newPassword', {
    token,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordPage);
