import Markdown from 'react-markdown';
import React from 'react';

import { shallow } from 'enzyme';

import Gallery from '../../../components/Gallery';
import Tip from '../Tip';

describe('Tip component', () => {
  it('renders', () => {
    expect(shallow(
      <Tip
        name="Foo"
        photos={[]}
        text="Bar"
      />
    ).getElement()).toEqual(
      <div>
        <h2>Foo</h2>
        <div>
          <Markdown source="Bar" />
        </div>
        <Gallery photos={[]} />
      </div>
    );
  });
});
