import FontAwesome from 'react-fontawesome';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ProgressBar from '../../../../src/web/components/progressBar';
import WorkshopPickerItem from '../../../../src/web/components/inputs/workshopPickerItem';
import WorkshopSummaryOneLine from '../../../../src/web/components/workshopSummaryOneLine';

describe('WorkshopPickerItem component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopPickerItem
        assigned={2}
        id={230}
        capacity={12}
        freeSpots={7}
        lectors={[]}
        name="Longformy"
        onChange={() => {}}
        reserved={3}
      />
    ).node).to.eql(
      <a
        className="workshopPickerItem-box workshopPickerItem-unselected"
        tabIndex={0}
        onClick={() => {}}
      >
        <WorkshopSummaryOneLine
          assigned={2}
          freeSpots={7}
          name="Longformy"
          lectors={[]}
          capacity={12}
          reserved={3}
        />
        <div className="workshopPickerItem-progress">
          <ProgressBar
            local
            max={12}
            min={0}
            now={5}
          />
        </div>
      </a>
    );
  });
  it('renders selected', () => {
    expect(shallow(
      <WorkshopPickerItem
        id={230}
        capacity={12}
        lectors={[]}
        name="Longformy"
        onChange={() => {}}
        selected
      />
    ).node).to.eql(
      <a
        className="workshopPickerItem-box workshopPickerItem-selected"
        tabIndex={0}
        onClick={() => {}}
      >
        <WorkshopSummaryOneLine
          name="Longformy"
          lectors={[]}
          capacity={12}
        />
        <div className="workshopPickerItem-progress">
          <ProgressBar
            local
            max={12}
            min={0}
            now={0}
          />
        </div>
        <span className="workshopPickerItem-check">
          <FontAwesome name="check-circle" />
        </span>
      </a>
    );
  });
  it('triggers onChange with null when selected', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <WorkshopPickerItem
        id={230}
        capacity={12}
        lectors={[]}
        name="Longformy"
        onChange={changeSpy}
        selected
      />
    );

    comp.find('a').simulate('click');
    expect(changeSpy.args).to.eql([
      [null],
    ]);
  });
  it('triggers onChange with id when not selected', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <WorkshopPickerItem
        id={230}
        capacity={12}
        lectors={[]}
        name="Longformy"
        onChange={changeSpy}
      />
    );

    comp.find('a').simulate('click');
    expect(changeSpy.args).to.eql([
      [230],
    ]);
  });
});
