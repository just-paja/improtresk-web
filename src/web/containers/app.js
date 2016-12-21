import { connect } from 'react-redux';

import App from '../components/app';

import { yearsAll } from '../selectors/years';

const mapStateToProps = state => ({
  years: yearsAll(state),
});

export default connect(mapStateToProps)(App);
