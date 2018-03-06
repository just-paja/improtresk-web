import { connect } from 'react-redux';

import Home from './components/Home';

import { yearActive } from '../years/selectors';

const mapStateToProps = state => ({
  year: yearActive(state),
});

export default connect(mapStateToProps)(Home);
