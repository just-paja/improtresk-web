import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';

import { shallow } from 'enzyme';

import LectorSummary from '../LectorSummary';
import Gallery from '../../../components/Gallery';

describe('Lector summary component', () => {
  it('renders detail with photos and helmet', () => {
    expect(shallow(
      <LectorSummary
        name="Hugo Ventil"
        position="Lektor"
        about="Markdown about"
        photos={[
          {
            image: 'foo',
            height: 200,
            width: 300,
          },
        ]}
      />
    ).getElement()).toEqual(
      <div>
        <Helmet
          meta={[
            {
              property: 'og:image',
              content: 'foo',
            },
            {
              property: 'og:image:height',
              content: 200,
            },
            {
              property: 'og:image:width',
              content: 300,
            },
          ]}
        />
        <h2>
          Hugo Ventil<br />
          <small>Lektor</small>
        </h2>
        <Markdown source="Markdown about" />
        <Gallery
          photos={[
            {
              image: 'foo',
              height: 200,
              width: 300,
            },
          ]}
        />
      </div>
    );
  });
});
