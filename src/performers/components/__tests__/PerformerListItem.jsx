import React from 'react';

import { shallow } from 'enzyme';

import PerformerListItem from '../PerformerListItem';

describe('PerformerListItem component', () => {
  it('renders performer name', () => {
    const comp = shallow(
      <PerformerListItem
        name="20000 židů pod mořem"
        id={10}
        frontImage="/images/10.jpg"
      />
    );
    expect(comp.find({ children: '20000 židů pod mořem' })).toHaveLength(1);
  });

  it('renders performer image', () => {
    const comp = shallow(
      <PerformerListItem
        name="20000 židů pod mořem"
        id={10}
        frontImage="/images/10.jpg"
      />
    );
    expect(comp.find('ImageHeader')).toHaveProp('image', '/images/10.jpg');
  });

  it('renders default performer image when not given any', () => {
    const comp = shallow(
      <PerformerListItem
        name="20000 židů pod mořem"
        id={10}
      />
    );
    expect(comp.find('ImageHeader')).toHaveProp('image', '/static/theme/2017/performer-mask.jpg');
  });
});
