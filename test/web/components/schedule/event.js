import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Link from '../../../../src/web/components/link';
import HumanTimeRange from '../../../../src/web/components/humanTimeRange';
import PermaLink from '../../../../src/web/components/permaLink';
import ScheduleEvent from '../../../../src/web/components/schedule/event';

describe('ScheduleEvent component', () => {
  it('renders', () => {
    expect(shallow(
      <ScheduleEvent
        name="Morning foo"
        startAt="2016-02-03T08:00:00"
        endAt="2016-02-03T10:00:00"
        rowHeight={2}
      />
    ).node).to.eql(
      <div style={{ height: 4 }}>
        <div>Morning foo</div>
        <HumanTimeRange
          start="2016-02-03T08:00:00"
          end="2016-02-03T10:00:00"
        />
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
        }}
        rowHeight={2}
      />
    ).node).to.eql(
      <div style={{ height: 4 }}>
        <div>Morning foo</div>
        <HumanTimeRange
          start="2016-02-03T08:00:00"
          end="2016-02-03T10:00:00"
        />
        <div>
          <hr />
          <ul className="list-unstyled">
            <li>
              <Link
                to="performers:item"
                params={{ slug: 'zaci-po-skole' }}
              >
                Žáci po škole
              </Link>
            </li>
          </ul>
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
        rowHeight={2}
      />
    ).node).to.eql(
      <div style={{ height: 4 }}>
        <div>Morning foo</div>
        <HumanTimeRange
          start="2016-02-03T08:00:00"
          end="2016-02-03T10:00:00"
        />
        <div>
          <hr />
          <ul className="list-unstyled">
            <li>
              <PermaLink
                id={214}
                to="workshops:item"
                title="Divadlo Fórum"
              >
                Divadlo Fórum
              </PermaLink>
            </li>
            <li>
              <PermaLink
                id={215}
                to="workshops:item"
                title="Rytmus a hlasy"
              >
                Rytmus a hlasy
              </PermaLink>
            </li>
          </ul>
        </div>
      </div>
    );
  });
});
