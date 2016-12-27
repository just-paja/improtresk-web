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
          onBlur={() => {}}
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
          onBlur={() => {}}
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
          onBlur={() => {}}
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
  it('triggers onChange on input value change when passed with no target input', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Input
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.find('FormControl').simulate('change', 'foo');
    expect(changeSpy.args).to.eql([
      ['text-input', 'foo'],
    ]);
  });
  it('triggers onChange on input value change when passed with formatValue prop', () => {
    const changeSpy = sinon.spy();
    const valueSpy = sinon.stub();
    valueSpy.returns('bar');
    const comp = shallow(
      <Input
        formatValue={valueSpy}
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.find('FormControl').simulate('change', 'foo');
    expect(valueSpy.args).to.eql([['foo']]);
    expect(changeSpy.args).to.eql([
      ['text-input', 'bar'],
    ]);
  });
  it('triggers touch state on input value change when passed changeLeadsToTouch', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Input
        changeLeadsToTouch
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.find('FormControl').simulate('change', 'foo');
    expect(comp.instance().state).to.eql({
      changed: true,
      touched: true,
    });
  });
  it('triggers touch state on input blur when input was changed', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Input
        changeLeadsToTouch
        label="Input label"
        name="text-input"
        onChange={changeSpy}
      />
    );

    comp.setState({ changed: true });

    comp.find('FormControl').simulate('blur');
    expect(comp.instance().state).to.eql({
      changed: true,
      touched: true,
    });
  });
  it('triggers onBlur on blur', () => {
    const blurSpy = sinon.spy();
    const comp = shallow(
      <Input
        changeLeadsToTouch
        label="Input label"
        name="text-input"
        onBlur={blurSpy}
      />
    );

    comp.setState({ changed: true });
    comp.find('FormControl').simulate('blur');
    expect(blurSpy.calledOnce).to.equal(true);
  });
});
