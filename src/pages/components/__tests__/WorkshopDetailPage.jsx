import React from 'react';

import { shallow } from 'enzyme';

import WorkshopDetailPage from '../WorkshopDetailPage';

describe('Workshop Detail page component', () => {
  it('renders detail container with resource ID', () => {
    const comp = shallow(
      <WorkshopDetailPage
        match={{
          params: {
            slug: 'nehraj-34789',
          },
        }}
      />
    );
    expect(comp.find('Connect(ContainerProgress(Connect(WorkshopDetail)))'))
      .toHaveProp('resourceId', 'nehraj-34789');
  });
});
