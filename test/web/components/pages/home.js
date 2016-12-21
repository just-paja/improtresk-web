import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Home from '../../../../src/web/components/pages/home';
import News from '../../../../src/web/components/news';

describe('Home component', () => {
  it('empty when not ready', () => {
    expect(shallow(
      <Home
        onMount={() => {}}
        news={[]}
        year={null}
      >
        <div>foo</div>
      </Home>
    ).node).to.equal(null);
  });

  it('renders content', () => {
    expect(shallow(
      <Home
        onMount={() => {}}
        news={[
          { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
        ]}
        ready
        year={null}
      >
        <div>foo</div>
      </Home>
    ).node).to.eql(
      <div>
        <h1>Improtřesk</h1>
        <News
          news={[
            { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
          ]}
        />
      </div>
    );
  });

  it('calls onMount on componentDidMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <Home
        onMount={mountSpy}
        news={[]}
      />
    );

    comp.instance().componentDidMount();
    expect(mountSpy.calledOnce).to.equal(true);
  });
});
