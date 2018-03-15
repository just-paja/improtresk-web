import React from 'react';

import { shallow } from 'enzyme';

import PerformerDetail from '../PerformerDetail';

describe('PerformerDetail component', () => {
  it('renders performer name', () => {
    const comp = shallow(
      <PerformerDetail
        performer={{
          createdAt: '2016-01-02T09:04:05',
          id: 25,
          descriptions: [
            {
              text: 'bar',
              lang: 'cs',
            },
          ],
          name: '20000 židů pod mořem',
          links: [],
          photos: [
            {
              id: 20,
              image: '/images/10.jpg',
            },
          ],
        }}
      />
    );
    expect(comp.find({ children: '20000 židů pod mořem' })).toHaveLength(1);
  });

  it('renders performer description', () => {
    const comp = shallow(
      <PerformerDetail
        performer={{
          createdAt: '2016-01-02T09:04:05',
          id: 25,
          descriptions: [
            {
              text: 'bar',
              lang: 'cs',
            },
          ],
          name: '20000 židů pod mořem',
          links: [],
          photos: [
            {
              id: 20,
              image: '/images/10.jpg',
            },
          ],
        }}
      />
    );
    expect(comp.find('Connect(MultiLingualMarkdown)')).toHaveProp('texts', [
      {
        text: 'bar',
        lang: 'cs',
      },
    ]);
  });

  it('renders performer links', () => {
    const comp = shallow(
      <PerformerDetail
        performer={{
          createdAt: '2016-01-02T09:04:05',
          id: 25,
          descriptions: [],
          name: '20000 židů pod mořem',
          links: [
            {
              address: 'http://example.com/',
              name: 'Example',
            },
          ],
          photos: [],
        }}
      />
    );
    expect(comp.find('LinkServiceList')).toHaveProp('links', [
      {
        address: 'http://example.com/',
        name: 'Example',
      },
    ]);
  });
});
