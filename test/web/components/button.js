import BootstrapButton from 'react-bootstrap/lib/Button';
import FontAwesome from 'react-fontawesome';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from '../../../src/web/components/button';

describe('Button component', () => {
  it('renders a button', () => {
    expect(shallow(<Button>foo</Button>).node).to.eql(
      <BootstrapButton className="button-buttonSize" disabled={false}>
        <FontAwesome className="button-buttonFa" name="floppy-o" />
        foo
      </BootstrapButton>
    );
  });
  it('renders a disabled button with rotating icon when loading', () => {
    expect(shallow(<Button loading>foo</Button>).node).to.eql(
      <BootstrapButton className="button-buttonSize" disabled>
        <FontAwesome className="button-buttonFa fa-spin" name="circle-o-notch" />
        foo
      </BootstrapButton>
    );
  });
});
