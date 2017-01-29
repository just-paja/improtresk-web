import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Home from '../../../../src/web/components/pages/home';
import HomeMenu from '../../../../src/web/components/homeMenu';
import YearDetail from '../../../../src/web/components/yearDetail';

describe('Home page component', () => {
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

  it('empty when not ready and no year', () => {
    expect(shallow(
      <Home
        onMount={() => {}}
        news={[]}
        ready
        year={null}
      >
        <div>foo</div>
      </Home>
    ).node).to.equal(null);
  });

  it('renders content for current year', () => {
    expect(shallow(
      <Home
        about="bla bla bla"
        onMount={() => {}}
        news={[
          { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
        ]}
        ready
        year={{
          current: true,
          startDate: '2016-01-02',
          endDate: '2016-01-05',
          startSignupsAt: '2016-01-01T00:00:00',
          topic: 'foo',
          year: '2016',
        }}
      >
        <div>foo</div>
      </Home>
    ).node).to.eql(
      <div className="year-2016">
        <YearDetail
          endDate="2016-01-05"
          startDate="2016-01-02"
          startSignupsAt="2016-01-01T00:00:00"
          topic="foo"
          year="2016"
        />
        <HomeMenu
          about="bla bla bla"
          news={[
            { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
          ]}
        />
      </div>
    );
  });

  it('renders content for next year', () => {
    expect(shallow(
      <Home
        about="bla bla bla"
        onMount={() => {}}
        news={[
          { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
        ]}
        ready
        year={{
          current: false,
          startDate: '2016-01-02',
          endDate: '2016-01-05',
          startSignupsAt: '2016-01-01T00:00:00',
          topic: 'foo',
          year: '2016',
        }}
      >
        <div>foo</div>
      </Home>
    ).node).to.eql(
      <div className="year-2016 year-next">
        <YearDetail
          endDate="2016-01-05"
          startDate="2016-01-02"
          startSignupsAt="2016-01-01T00:00:00"
          topic="foo"
          year="2016"
        />
      </div>
    );
  });

  it('calls onMount on componentWillMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <Home
        onMount={mountSpy}
        news={[]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
  });
});
