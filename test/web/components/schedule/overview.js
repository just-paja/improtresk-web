import Col from 'react-bootstrap/lib/Col';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ScheduleDay from '../../../../src/web/components/schedule/day';
import ScheduleHours from '../../../../src/web/components/schedule/hours';
import ScheduleOverview from '../../../../src/web/components/schedule/overview';

describe('ScheduleOverview component', () => {
  it('renders', () => {
    expect(shallow(
      <ScheduleOverview
        endAt="2017-02-05T00:00:00Z"
        startAt="2017-02-03T00:00:00Z"
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2017-02-03T08:00:00Z',
            endAt: '2017-02-03T10:00:00Z',
            workshops: [],
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2017-02-04T08:00:00Z',
            endAt: '2017-02-04T11:00:00Z',
            workshops: [],
          },
        ]}
        rowHeight={2}
      />
    ).node).to.eql(
      <div className="overview-container">
        <Row className="overview-agenda">
          <Col sm={0} md={1} className="overview-hourStretch hidden-xs hidden-sm">
            <ScheduleHours min={7} max={12} rowHeight={2} />
          </Col>
          <Col sm={0} md={1} className="overview-hoursOverlay hidden-xs hidden-sm">
            <ScheduleHours min={7} max={12} rowHeight={2} />
          </Col>
          <Col className="overview-days" md={11} sm={12}>
            <Row className="overview-daysOverlay">
              <Col xs={12} sm={6} md={3} className="overview-day">
                <ScheduleDay
                  date="2017-02-03T00:00:00Z"
                  rowHeight={2}
                  events={[
                    {
                      id: 1,
                      name: 'Morning foo',
                      startAt: '2017-02-03T08:00:00Z',
                      endAt: '2017-02-03T10:00:00Z',
                      workshops: [],
                    },
                  ]}
                  maxHour={12}
                  minHour={7}
                />
              </Col>
              <Col xs={12} sm={6} md={3} className="overview-day">
                <ScheduleDay
                  date="2017-02-04T00:00:00Z"
                  rowHeight={2}
                  events={[
                    {
                      id: 2,
                      name: 'Morning foo',
                      startAt: '2017-02-04T08:00:00Z',
                      endAt: '2017-02-04T11:00:00Z',
                      workshops: [],
                    },
                  ]}
                  maxHour={12}
                  minHour={7}
                />
              </Col>
              <Col xs={12} sm={6} md={3} className="overview-day">
                <ScheduleDay
                  date="2017-02-05T00:00:00Z"
                  rowHeight={2}
                  events={[]}
                  maxHour={12}
                  minHour={7}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  });
});
