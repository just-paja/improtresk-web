import React from 'react';

import { shallow } from 'enzyme';

import LinkServiceList from '../LinkServiceList';

describe('LinkServiceList component', () => {
  it('renders as unstyled list when not inline', () => {
    const comp = shallow(
      <LinkServiceList
        inline={false}
        links={[
          {
            address: 'https://example.com',
            id: 10,
            name: 'External Link Text',
            service: 'external',
          },
        ]}
      />
    );
    expect(comp.find('ul').prop('className')).toContain('list-unstyled');
  });

  it('renders as inline list when inline', () => {
    const comp = shallow(
      <LinkServiceList
        inline
        links={[
          {
            address: 'https://example.com',
            id: 10,
            name: 'External Link Text',
            service: 'external',
          },
        ]}
      />
    );
    expect(comp.find('ul').prop('className')).toContain('list-inline');
  });

  it('renders passed links', () => {
    const comp = shallow(
      <LinkServiceList
        inline
        links={[
          {
            address: 'https://example.com',
            id: 10,
            name: 'External Link Text',
            service: 'external',
          },
        ]}
      />
    );
    expect(comp.find('LinkService')).toHaveProp('href', 'https://example.com');
  });
});
