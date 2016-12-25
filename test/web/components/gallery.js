import React from 'react';
import ReactGallery from 'react-photo-gallery';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Gallery from '../../../src/web/components/gallery';

describe('Gallery component', () => {
  it('renders React Gallery', () => {
    expect(shallow(
      <Gallery
        photos={[
          {
            src: 'http://example.com/test1.jpg',
            caption: 'foo',
            height: 200,
            width: 400,
          },
          {
            src: 'http://example.com/test2.jpg',
            height: 400,
            width: 200,
          },
        ]}
      />
    ).node).to.eql(
      <ReactGallery
        photos={[
          {
            src: 'http://example.com/test1.jpg',
            caption: 'foo',
            height: 200,
            width: 400,
            aspectRatio: 2,
            lightboxImage: {
              src: 'http://example.com/test1.jpg',
              caption: 'foo',
            },
          },
          {
            src: 'http://example.com/test2.jpg',
            height: 400,
            width: 200,
            aspectRatio: 1 / 2,
            lightboxImage: {
              src: 'http://example.com/test2.jpg',
              caption: undefined,
            },
          },
        ]}
      />
    );
  });
});
