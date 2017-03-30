import React from 'react';
import sinon from 'sinon';

import { Radio, FormGroup, HelpBlock } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import InputRadio from '../../../../src/web/components/inputs/inputRadio';

describe('InputRadio component', () => {
  it('renders input component', () => {
    expect(shallow(
      <InputRadio
        label="Input label"
        name="test-input"
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <Radio
          name="test-input"
          onBlur={null}
          onChange={() => {}}
          checked={false}
        >Input label</Radio>
      </FormGroup>
    );
  });
  it('renders input component with help message', () => {
    expect(shallow(
      <InputRadio
        help="foo"
        label="Input label"
        name="test-input"
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <Radio
          name="test-input"
          onBlur={null}
          onChange={() => {}}
          checked={false}
        >Input label</Radio>
        <HelpBlock>foo</HelpBlock>
      </FormGroup>
    );
  });
  it('renders input component in non-error state when not touched', () => {
    expect(shallow(
      <InputRadio
        error="foo"
        label="Input label"
        name="test-input"
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <Radio
          name="test-input"
          onBlur={null}
          onChange={() => {}}
          checked={false}
        >Input label</Radio>
      </FormGroup>
    );
  });
  it('renders input component in error state', () => {
    expect(shallow(
      <InputRadio
        error="foo"
        label="Input label"
        name="test-input"
        touched
      />
    ).node).to.eql(
      <FormGroup validationState="error">
        <Radio
          name="test-input"
          onBlur={null}
          onChange={() => {}}
          checked={false}
        >Input label</Radio>
        <HelpBlock>foo</HelpBlock>
      </FormGroup>
    );
  });
  it('triggers onChange with input name and value', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <InputRadio
        error="foo"
        label="Input label"
        name="test-input"
        onChange={changeSpy}
      />
    );

    comp.find('Radio').simulate('change', { target: { checked: true } });
    expect(changeSpy.args).to.eql([
      ['test-input', true],
    ]);
  });
});
