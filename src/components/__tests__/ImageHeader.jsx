import React from 'react';

import { shallow } from 'enzyme';

import ImageHeader from '../ImageHeader';

describe('Image Header component', () => {
  it('renders image with styles', () => {
    expect(shallow(
      <ImageHeader image="foo" />
    ).getElement()).toEqual(
      <div className="header" style={{ backgroundImage: 'url(foo)' }}>
        <img src="foo" alt="" className="image" />
      </div>
    );
  });
});
