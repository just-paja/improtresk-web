import React from 'react';

import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';

describe('PrivateRoute', () => {
  it('renders component for authenticated', () => {
    const FakeComponent = () => (<h1>FakeComponent</h1>);
    const comp = shallow(
      <PrivateRoute
        isAuthenticated
        path="/somePath"
        component={FakeComponent}
      />
    );
    const rendered = shallow(
      <MemoryRouter initialEntries={['/somePath']}>
        {comp.props().render()}
      </MemoryRouter>
    );
    expect(rendered.find('FakeComponent')).toHaveLength(1);
  });

  it('redirects NOT authenticated to /login', () => {
    const FakeComponent = () => (<h1>FakeComponent</h1>);
    const comp = shallow(
      <PrivateRoute
        isAuthenticated={false}
        path="/somePath"
        component={FakeComponent}
      />
    );
    const rendered = shallow(
      <MemoryRouter>
        {comp.props().render()}
      </MemoryRouter>
    );
    expect(rendered.find('Redirect')).toHaveProp('to', '/login');
  });
});
