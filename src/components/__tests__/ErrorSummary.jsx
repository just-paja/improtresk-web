import React from 'react';

import { shallow } from 'enzyme';

import ErrorSummary from '../ErrorSummary';

describe('ErrorSummary component', () => {
  it('renders no details message when given no error', () => {
    const comp = shallow(<ErrorSummary />);
    expect(comp.find('Connect(Message)[name="generic.missingErrorDetails"]')).toHaveLength(1);
  });

  it('renders passed message when given string error', () => {
    const comp = shallow(<ErrorSummary error="something went wrong" />);
    expect(comp.find({
      children: 'something went wrong',
    })).toHaveLength(1);
  });

  it('renders passed error message when given error object', () => {
    const comp = shallow(<ErrorSummary error={new Error('something went really wrong')} />);
    expect(comp.find({
      children: 'something went really wrong',
    })).toHaveLength(1);
  });
});
