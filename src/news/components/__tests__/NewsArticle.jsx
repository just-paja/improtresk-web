import React from 'react';

import { shallow } from 'enzyme';

import NewsArticle from '../NewsArticle';

describe('NewsArticle component', () => {
  it('renders article name', () => {
    const comp = shallow(
      <NewsArticle
        onVote={() => {}}
        newsDetail={{
          id: 21,
          name: 'Improtřesk v Milevsku',
          createdAt: '2016-01-02T03:04:05',
          updatedAt: '2016-01-02T03:04:05',
          text: 'Letos v Milevsku',
          photos: [
            {
              id: 5,
              src: '/images/front.jpg',
              height: 200,
              width: 200,
            },
          ],
        }}
      />
    );
    expect(comp.find({ children: 'Improtřesk v Milevsku' })).toHaveLength(1);
  });

  it('renders article text', () => {
    const comp = shallow(
      <NewsArticle
        onVote={() => {}}
        newsDetail={{
          id: 21,
          name: 'Improtřesk v Milevsku',
          createdAt: '2016-01-02T03:04:05',
          updatedAt: '2016-01-02T03:04:05',
          text: 'Letos v Milevsku',
          photos: [
            {
              id: 5,
              src: '/images/front.jpg',
              height: 200,
              width: 200,
            },
          ],
        }}
      />
    );
    expect(comp.find('ReactMarkdown')).toHaveLength(1);
  });

  it('renders photo gallery', () => {
    const comp = shallow(
      <NewsArticle
        onVote={() => {}}
        newsDetail={{
          id: 21,
          name: 'Improtřesk v Milevsku',
          createdAt: '2016-01-02T03:04:05',
          updatedAt: '2016-01-02T03:04:05',
          text: 'Letos v Milevsku',
          photos: [
            {
              id: 5,
              src: '/images/front.jpg',
              height: 200,
              width: 200,
            },
          ],
        }}
      />
    );
    expect(comp.find('Gallery')).toHaveProp('photos', [
      {
        id: 5,
        src: '/images/front.jpg',
        height: 200,
        width: 200,
      },
    ]);
  });
});
