import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';

const AppHelmet = ({
  defaultTitle,
  host,
  pathname,
  titleTemplate,
}) => (
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
        content: `${host}${pathname}`,
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
);

AppHelmet.propTypes = {
  defaultTitle: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  titleTemplate: PropTypes.string.isRequired,
};

export default AppHelmet;
