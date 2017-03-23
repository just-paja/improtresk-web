import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanTimeRange from '../../../../src/web/components/humanTimeRange';
import ScheduleEvent from '../../../../src/web/components/schedule/event';

describe('ScheduleEvent component', () => {
  it('renders', () => {
    expect(shallow(
      <ScheduleEvent
        name="Morning foo"
        startAt="2016-02-03T08:00:00"
        endAt="2016-02-03T10:00:00"
        minHour={7}
        rowHeight={2}
        workshops={[]}
      />
    ).node).to.eql(
      <div className="event-container">
        <div className="event-boxWrapper" style={{ left: '0%', top: 2, width: '99%' }}>
          <div className="event-box" style={{ minHeight: 4 }}>
            <div className="event-boxOverlay" style={{}} />
            <div className="event-boxShell">
              <div>
                <div>Morning foo</div>
                <HumanTimeRange
                  start="2016-02-03T08:00:00"
                  end="2016-02-03T10:00:00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  it('renders with performer', () => {
    expect(shallow(
      <ScheduleEvent
        name="Morning foo"
        startAt="2016-02-03T08:00:00"
        endAt="2016-02-03T10:00:00"
        performer={{
          id: 213,
          name: 'Žáci po škole',
          slug: 'zaci-po-skole',
          frontImage: 'http://example.com/front-image',
        }}
        minHour={7}
        rowHeight={2}
        workshops={[]}
      />
    ).node).to.eql(
      <div className="event-container">
        <div className="event-boxWrapper" style={{ left: '0%', top: 2, width: '99%' }}>
          <div
            className="event-box event-withPerformers event-withPerformerPhoto"
            style={{ minHeight: 4 }}
          >
            <div
              className="event-boxOverlay"
              style={{ backgroundImage: 'url(http://example.com/front-image)' }}
            />
            <div className="event-boxShell">
              <div>
                <div>Morning foo</div>
                <HumanTimeRange
                  start="2016-02-03T08:00:00"
                  end="2016-02-03T10:00:00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  it('renders with workshops', () => {
    expect(shallow(
      <ScheduleEvent
        name="Morning foo"
        startAt="2016-02-03T08:00:00"
        endAt="2016-02-03T10:00:00"
        minHour={7}
        rowHeight={2}
        workshops={[
          {
            id: 214,
            name: 'Divadlo Fórum',
          },
          {
            id: 215,
            name: 'Rytmus a hlasy',
          },
        ]}
      />
    ).node).to.eql(
      <div className="event-container">
        <div className="event-boxWrapper" style={{ left: '0%', top: 2, width: '99%' }}>
          <div className="event-box event-withWorkshops" style={{ minHeight: 4 }}>
            <div className="event-boxOverlay" style={{}} />
            <div className="event-boxShell">
              <div>
                <div>Morning foo</div>
                <HumanTimeRange
                  start="2016-02-03T08:00:00"
                  end="2016-02-03T10:00:00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
});
