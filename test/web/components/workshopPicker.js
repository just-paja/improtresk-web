import Col from 'react-bootstrap/lib/Col';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import WorkshopPicker from '../../../src/web/components/workshopPicker';
import WorkshopPickerItem from '../../../src/web/components/workshopPickerItem';

describe('WorkshopPicker component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopPicker
        name="workshop"
        onChange={() => {}}
        value={21}
        workshops={[
          {
            id: 21,
            lectors: [],
            name: 'Longformy',
            capacityStatus: {
              assigned: 2,
              capacity: 12,
              freeSpots: 7,
              reserved: 3,
            },
          },
          {
            id: 32,
            lectors: [],
            name: 'Kontaktní improvizace',
            capacityStatus: {
              assigned: 0,
              capacity: 19,
              freeSpots: 19,
              reserved: 0,
            },
          },
        ]}
      />
    ).node).to.eql(
      <Row>
        <Col key={21} sm={6} lg={4}>
          <WorkshopPickerItem
            assigned={2}
            capacity={12}
            freeSpots={7}
            id={21}
            lectors={[]}
            name="Longformy"
            onChange={() => {}}
            reserved={3}
            selected
          />
        </Col>
        <Col key={21} sm={6} lg={4}>
          <WorkshopPickerItem
            assigned={0}
            capacity={19}
            freeSpots={19}
            id={32}
            lectors={[]}
            name="Kontaktní improvizace"
            onChange={() => {}}
            reserved={0}
            selected={false}
          />
        </Col>
      </Row>
    );
  });
  it('triggers onChange with id when not selected', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <WorkshopPicker
        name="workshop"
        onChange={changeSpy}
        value={21}
        workshops={[
          {
            name: 'Longformy',
            id: 21,
            lectors: [],
            capacityStatus: {
              capacity: 12,
            },
          },
        ]}
      />
    );

    comp.find(WorkshopPickerItem).simulate('change', 21);
    expect(changeSpy.args).to.eql([
      ['workshop', 21],
    ]);
  });
});
