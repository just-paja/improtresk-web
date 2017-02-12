import Helmet from 'react-helmet';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../../src/web/components/app';
import Footer from '../../../src/web/components/footer';
import Navigation from '../../../src/web/components/navigation';

describe('App component', () => {
  it('renders as null when not ready', () => {
    expect(shallow(
      <App
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        ready={false}
        location={{ pathname: '/' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      >
        <div>foo</div>
      </App>
    ).node).to.equal(null);
  });
  it('renders layout and content', () => {
    expect(shallow(
      <App
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        ready
        location={{ pathname: '/' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      >
        <div>foo</div>
      </App>
    ).node).to.eql(
      <div className="app-app">
        <Helmet
          defaultTitle="Festival divadelní improvizace"
          titleTemplate="%s - Improtřesk 2016"
          meta={[
            {
              property: 'og:title',
              content: 'Festival divadelní improvizace - Improtřesk 2016',
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
              content: 'http://foo/',
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
        <Navigation
          currentYear={{ year: '2016', topic: 'Kůže' }}
          years={[
            { year: '2016', topic: 'Ovce' },
          ]}
        />
        <div>foo</div>
        <Footer partners={[]} />
      </div>
    );
  });

  it('calls onMount on componentDidMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <App
        onMount={mountSpy}
        location={{ pathname: '/' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
  });
});
