import { connect } from 'react-redux';

import { getLang } from '../selectors/locales';
import { getUrlName } from '../routeTable';

import * as locales from '../locales';

import LanguagePicker from '../components/LanguagePicker';

const mapStateToProps = state => ({
  availableLangs: Object.keys(locales),
  pathName: typeof window === 'undefined' ? 'home' : getUrlName(getLang(state), window.location.pathname) || 'home',
  selectedLang: getLang(state),
});

export default connect(mapStateToProps)(LanguagePicker);
