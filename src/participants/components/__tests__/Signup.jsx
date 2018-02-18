import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import Signup from '../Signup';

describe('Signup Form component', () => {
  it('renders form inputs', () => {
    const comp = shallow(
      <Signup
        translate={msg => msg}
        form="signup"
        onChange={() => {}}
        onSubmit={() => {}}
        errors={{
          name: 'name error',
          email: 'email error',
          phone: 'phone error',
          birthday: 'birthday error',
          team_name: 'team error',
          rules_accepted: 'rules error',
        }}
        teams={[]}
        values={{
          name: 'name value',
          email: 'email value',
          phone: 'phone value',
          birthday: 'birthday value',
          team_name: 'team value',
          rules_accepted: false,
          newsletter: false,
        }}
      />
    );

    expect(comp.find('[name="name"]')).toHaveLength(1);
    expect(comp.find('[name="email"]')).toHaveLength(1);
    expect(comp.find('[name="phone"]')).toHaveLength(1);
    expect(comp.find('[name="birthday"]')).toHaveLength(1);
    expect(comp.find('[name="password"]')).toHaveLength(1);
    expect(comp.find('[name="team_name"]')).toHaveLength(1);
  });

  it('renders form disabled', () => {
    const comp = shallow(
      <Signup
        translate={msg => msg}
        form="signup"
        onChange={() => {}}
        onSubmit={() => {}}
        errors={{}}
        teams={[]}
        values={{}}
        disabled
      />
    );
    expect(comp.find('[name="name"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="email"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="phone"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="birthday"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="password"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="team_name"]')).toHaveProp('disabled', true);
    expect(comp.find('Button')).toHaveProp('disabled', true);
  });

  it('injects form name into onChange', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Signup
        translate={msg => msg}
        form="signup"
        onChange={changeSpy}
        onSubmit={() => {}}
        errors={{}}
        teams={[]}
        values={{}}
      />
    );

    comp.find('Input').at(0).simulate('change', 'name', 'foo');
    expect(changeSpy.args).toEqual([
      ['signup', 'name', 'foo'],
    ]);
  });

  it('triggers onSubmit on form submit', () => {
    const preventDefaultSpy = sinon.spy();
    const submitSpy = sinon.spy();
    const comp = shallow(
      <Signup
        translate={msg => msg}
        form="signup"
        onChange={() => {}}
        onSubmit={submitSpy}
        errors={{}}
        teams={[]}
        values={{}}
      />
    );

    comp.simulate('submit', {
      preventDefault: preventDefaultSpy,
    });
    expect(submitSpy.args).toEqual([
      ['signup'],
    ]);
    expect(preventDefaultSpy.calledOnce).toBe(true);
  });
});
