import React from 'react';
import sinon from 'sinon';

import { Checkbox, FormGroup, HelpBlock } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import InputCheckbox from '../../../../src/web/components/inputs/inputCheckbox';

describe('Input Checkbox component', () => {
  it('renders input component', () => {
    expect(shallow(
      <InputCheckbox
        label="Input label"
        name="test-input"
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <Checkbox
          name="test-input"
          onBlur={null}
          onChange={() => {}}
          checked={false}
        >Input label</Checkbox>
      </FormGroup>
    );
  });
  it('renders input component with help message', () => {
    expect(shallow(
      <InputCheckbox
        help="foo"
        label="Input label"
        name="test-input"
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <Checkbox
          name="test-input"
          onBlur={null}
          onChange={() => {}}
          checked={false}
        >Input label</Checkbox>
        <HelpBlock>foo</HelpBlock>
      </FormGroup>
    );
  });
  it('renders input component in non-error state when not touched', () => {
    expect(shallow(
      <InputCheckbox
        error="foo"
        label="Input label"
        name="test-input"
      />
    ).node).to.eql(
      <FormGroup validationState={null}>
        <Checkbox
          name="test-input"
          onBlur={null}
          onChange={() => {}}
          checked={false}
        >Input label</Checkbox>
      </FormGroup>
    );
  });
  it('renders input component in error state', () => {
    expect(shallow(
      <InputCheckbox
        error="foo"
        label="Input label"
        name="test-input"
        touched
      />
    ).node).to.eql(
      <FormGroup validationState="error">
        <Checkbox
          name="test-input"
          onBlur={null}
          onChange={() => {}}
          checked={false}
        >Input label</Checkbox>
        <HelpBlock>foo</HelpBlock>
      </FormGroup>
    );
  });
  it('triggers onChange with input name and value', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <InputCheckbox
        error="foo"
        label="Input label"
        name="test-input"
        onChange={changeSpy}
      />
    );

    comp.find('Checkbox').simulate('change', { target: { checked: true } });
    expect(changeSpy.args).to.eql([
      ['test-input', true],
    ]);
  });
});
