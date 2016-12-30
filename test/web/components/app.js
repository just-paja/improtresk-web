import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../../src/web/components/app';
import Navigation from '../../../src/web/components/navigation';

describe('App component', () => {
  it('renders layout and content', () => {
    expect(shallow(
      <App
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      >
        <div>foo</div>
      </App>
    ).node).to.eql(
      <div className="app-app">
        <Navigation
          currentYear={{ year: '2016', topic: 'Kůže' }}
          years={[
            { year: '2016', topic: 'Ovce' },
          ]}
        />
        <div>foo</div>
      </div>
    );
  });

  it('calls onMount on componentDidMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <App
        onMount={mountSpy}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
  });
});
