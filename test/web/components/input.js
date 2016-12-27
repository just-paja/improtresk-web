import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Input from '../../../src/web/components/input';

describe('Input component', () => {
  it('renders as text input', () => {
    expect(shallow(
      <Input
        label="Input label"
        name="text-input"
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <ControlLabel>Input label</ControlLabel>
        <FormControl
          maxLength={255}
          name="text-input"
          onChange={() => {}}
          type="text"
          value=""
        />
        <FormControl.Feedback />
      </FormGroup>
    );
  });
  it('replaces blank values as empty string', () => {
    expect(shallow(
      <Input
        label="Input label"
        name="text-input"
        value={null}
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <ControlLabel>Input label</ControlLabel>
        <FormControl
          maxLength={255}
          name="text-input"
          onChange={() => {}}
          type="text"
          value=""
        />
        <FormControl.Feedback />
      </FormGroup>
    );
  });

  it('renders as email input with help', () => {
    expect(shallow(
      <Input
        help="This is the input help!"
        label="Input label"
        name="text-input"
        type="email"
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <ControlLabel>Input label</ControlLabel>
        <FormControl
          maxLength={255}
          name="text-input"
          onChange={() => {}}
          type="email"
          value=""
        />
        <HelpBlock>This is the input help!</HelpBlock>
        <FormControl.Feedback />
      </FormGroup>
    );
  });

  it('ignores onChange on input value change by default', () => {
    const comp = shallow(
      <Input
        label="Input label"
        name="text-input"
      />
    );

    expect(() => comp.find('FormControl').simulate('change')).to.not.throw();
  });
  it('triggers onChange on input value change when passed', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Input
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.find('FormControl').simulate('change', {
      target: {
        name: 'text-input',
        value: 'foo',
      },
    });

    expect(changeSpy.args).to.eql([
      ['text-input', 'foo'],
    ]);
  });
});
