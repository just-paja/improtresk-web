import { connect } from 'react-redux';

import { getLang } from '../selectors/locales';
import { getUrlName } from '../routeTable';

import * as locales from '../locales';

import LanguagePicker from '../components/LanguagePicker';

const mapStateToProps = state => ({
  pathName: typeof window === 'undefined' || !window ? 'home' : getUrlName(getLang(state), window.location.pathname) || 'home',
  availableLangs: Object.keys(locales),
  selectedLang: getLang(state),
});

export default connect(mapStateToProps)(LanguagePicker);
