import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ImageHeader from '../../../src/web/components/imageHeader';

describe('Image Header component', () => {
  it('renders image with styles', () => {
    expect(shallow(
      <ImageHeader image="foo" />
    ).node).to.eql(
      <div className="imageHeader-header" style={{ backgroundImage: 'url(foo)' }}>
        <img src="foo" alt="" className="imageHeader-image" />
      </div>
    );
  });
});
