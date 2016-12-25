import Markdown from 'react-markdown';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Gallery from '../../../src/web/components/gallery';
import Tip from '../../../src/web/components/tip';

describe('Tip component', () => {
  it('renders', () => {
    expect(shallow(
      <Tip
        name="Foo"
        photos={[]}
        text="Bar"
      />
    ).node).to.eql(
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
