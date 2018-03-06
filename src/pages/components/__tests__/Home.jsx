import React from 'react';

import { shallow } from 'enzyme';

import Home from '../Home';

describe('Home page component', () => {
  it('renders content for current year', () => {
    const comp = shallow(
      <Home
        news={[
          { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
        ]}
        progress={{}}
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
    );
    expect(comp.find('YearDetail')).toHaveLength(1);
  });

  it('renders content for next year', () => {
    const comp = shallow(
      <Home
        news={[
          { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
        ]}
        progress={{}}
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
    );
    expect(comp.find('YearDetail').props()).toMatchObject({
      endDate: '2016-01-05',
      startDate: '2016-01-02',
      startSignupsAt: '2016-01-01T00:00:00',
      topic: 'foo',
      year: '2016',
    });
  });
});
