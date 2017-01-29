import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';

import Navigation from './navigation';
import Footer from './footer';

import styles from './app.css';

export default class App extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { children, currentYear, host, route: { path }, years } = this.props;
    const defaultTitle = 'Festival divadelní improvizace';
    const titleTemplate = currentYear ? `%s - Improtřesk ${currentYear.year}` : '%s - Improtřesk';

    return (
      <div className={styles.app}>
        <Helmet
          defaultTitle={defaultTitle}
          titleTemplate={titleTemplate}
          meta={[
            {
              property: 'og:title',
              content: titleTemplate.replace('%s', defaultTitle),
            },
            {
              property: 'og:description',
              content:
                'Improtřesk je český festival divadelní improvizace a největší setkání ' +
                'improvizátorů z celé České republiky. Každý rok se na Improtřesku ' +
                'otevírají dílny z oblasti improvizačního divadla na kterých se schází ' +
                'nadšenci improvizačního divadla i veřejnost.',
            },
            {
              property: 'og:type',
              content: 'website',
            },
            {
              property: 'og:url',
              content: `${host}${path}`,
            },
            {
              name: 'msapplication-config',
              content: '/static/theme/favicon/browserconfig.xml',
            },
            {
              name: 'theme-color',
              content: '#ffffff',
            },
          ]}
          link={[
            {
              rel: 'stylesheet',
              type: 'text/css',
              href: '/static/bootswatch/sandstone/bootstrap.min.css',
            },
            {
              rel: 'stylesheet',
              type: 'text/css',
              href: '/static/font-awesome/css/font-awesome.min.css',
            },
            {
              rel: 'apple-touch-icon',
              sizes: '180x180',
              href: '/static/theme/favicon/apple-icon-180x180.png',
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '32x32',
              href: '/static/theme/favicon/favicon-32x32.png',
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '16x16',
              href: '/static/theme/favicon/favicon-16x16.png',
            },
            {
              rel: 'manifest',
              href: '/static/theme/favicon/manifest.json',
            },
            {
              rel: 'mask-icon',
              color: '#5bbad5',
              href: '/static/theme/favicon/safari-pinned-tab.svg',
            },
            {
              rel: 'shortcut icon',
              href: '/static/theme/favicon/favicon.ico',
            },
          ]}
        />
        <Navigation currentYear={currentYear} years={years} />
        {children}
        <Footer partners={[]} />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  currentYear: PropTypes.object,
  host: PropTypes.string,
  route: PropTypes.shape({
    path: PropTypes.string,
  }),
  onMount: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  children: null,
  currentYear: null,
  host: null,
  route: null,
  years: null,
};
