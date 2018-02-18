import React from 'react';

import { shallow } from 'enzyme';

import AppErrors from '../AppErrors';

describe('App Errors component', () => {
  it('renders main heading', () => {
    const comp = shallow(<AppErrors errors={['foo']} />);
    expect(comp.find('h1 Connect(Message)')).toHaveProp('name', 'app.somethingWentWrong');
  });

  it('renders help text', () => {
    const comp = shallow(<AppErrors errors={['foo']} />);
    expect(comp.find('Connect(Message)[name="app.errorHelpText"]')).toHaveLength(1);
  });

  it('renders a problem warning with unknown message', () => {
    const comp = shallow(<AppErrors errors={['foo']} />);
    expect(comp.find('Connect(Message)[name="error.unknown"]')).toHaveProp('data', {
      message: 'foo',
    });
  });

  it('renders a problem warning with failed to fetch message', () => {
    const comp = shallow(<AppErrors errors={['Failed to fetch']} />);
    expect(comp.find('Connect(Message)[name="error.connection"]')).toHaveLength(1);
  });

  it('renders a problem warning with failed to fetch message', () => {
    const comp = shallow(<AppErrors errors={['Could not connect']} />);
    expect(comp.find('Connect(Message)[name="error.connection"]')).toHaveLength(1);
  });
});
