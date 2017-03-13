import FontAwesome from 'react-fontawesome';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import WorkshopPickerItem from '../../../src/web/components/workshopPickerItem';
import WorkshopSummaryOneLine from '../../../src/web/components/workshopSummaryOneLine';

describe('WorkshopPickerItem component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopPickerItem
        id={230}
        capacity={12}
        lectors={[]}
        name="Longformy"
        onChange={() => {}}
      />
    ).node).to.eql(
      <a
        className="workshopPickerItem-box workshopPickerItem-unselected"
        tabIndex={0}
        onClick={() => {}}
      >
        <span className="workshopPickerItem-input">
          <FontAwesome name="square-o" />
        </span>
        <div className="workshopPickerItem-workshop">
          <WorkshopSummaryOneLine
            name="Longformy"
            lectors={[]}
            capacity={12}
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
        <span className="workshopPickerItem-input">
          <FontAwesome name="check-square-o" />
        </span>
        <div className="workshopPickerItem-workshop">
          <WorkshopSummaryOneLine
            name="Longformy"
            lectors={[]}
            capacity={12}
          />
        </div>
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
