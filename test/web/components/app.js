import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../../src/web/components/app';
import AppErrors from '../../../src/web/components/appErrors';
import AppHelmet from '../../../src/web/components/appHelmet';
import Footer from '../../../src/web/components/footer';
import Navigation from '../../../src/web/components/navigation';
import ProgressBar from '../../../src/web/components/progressBar';

describe('App component', () => {
  it('renders as null when not ready', () => {
    expect(shallow(
      <App
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        errors={[]}
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
        activeRequests={5}
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        errors={[]}
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
        <AppHelmet
          defaultTitle="Festival divadelní improvizace"
          host="http://foo"
          pathname="/"
          titleTemplate="%s - Improtřesk 2016"
        />
        <Navigation
          currentYear={{ year: '2016', topic: 'Kůže' }}
          years={[
            { year: '2016', topic: 'Ovce' },
          ]}
        />
        <ProgressBar activeRequests={5} />
        <div>foo</div>
        <Footer partners={[]} />
      </div>
    );
  });
  it('renders errors if any', () => {
    expect(shallow(
      <App
        activeRequests={5}
        errors={['foo']}
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
        <AppHelmet
          defaultTitle="Festival divadelní improvizace"
          host="http://foo"
          pathname="/"
          titleTemplate="%s - Improtřesk 2016"
        />
        <Navigation
          currentYear={{ year: '2016', topic: 'Kůže' }}
          years={[
            { year: '2016', topic: 'Ovce' },
          ]}
        />
        <ProgressBar activeRequests={5} />
        <AppErrors errors={['foo']} />
        <Footer partners={[]} />
      </div>
    );
  });
  it('calls onMount on componentDidMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <App
        onMount={mountSpy}
        errors={[]}
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
