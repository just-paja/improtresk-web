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
            name: 'Longformy',
          },
          {
            id: 32,
            name: 'Kontaktní improvizace',
          },
        ]}
      />
    ).node).to.eql(
      <Row>
        <Col key={21} sm={6} lg={4}>
          <WorkshopPickerItem
            id={21}
            name="Longformy"
            onChange={() => {}}
            selected
          />
        </Col>
        <Col key={21} sm={6} lg={4}>
          <WorkshopPickerItem
            id={32}
            name="Kontaktní improvizace"
            onChange={() => {}}
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
            id: 21,
            name: 'Longformy',
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
