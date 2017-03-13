import React from 'react';
import Well from 'react-bootstrap/lib/Well';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import WellWithDecoration from '../../../src/web/components/wellWithDecoration';
import ImageHeader from '../../../src/web/components/imageHeader';

describe('WellWithDecoration component', () => {
  it('renders', () => {
    expect(shallow(
      <WellWithDecoration
        image="http://localhost/web/image.png"
      >
        foo
      </WellWithDecoration>
    ).node).to.eql(
      <div>
        <Well className="wellWithDecoration-well">
          foo
        </Well>
        <ImageHeader image="http://localhost/web/image.png" />
      </div>

    );
  });
});
