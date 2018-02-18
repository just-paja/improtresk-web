import Helmet from 'react-helmet';
import React from 'react';

import { shallow } from 'enzyme';

import AppHelmet from '../AppHelmet';

describe('AppHelmet component', () => {
  it('renders', () => {
    expect(shallow(
      <AppHelmet
        defaultTitle="Festival divadelní improvizace"
        host="https://improtresk.cz"
        pathname="/prihlaska"
        titleTemplate="%s - Improtřesk"
      />
    ).getElement()).toEqual(
      <Helmet
        defaultTitle="Festival divadelní improvizace"
        titleTemplate="%s - Improtřesk"
        meta={[
          {
            property: 'og:title',
            content: 'Festival divadelní improvizace - Improtřesk',
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
            content: 'https://improtresk.cz/prihlaska',
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
  });
});
