import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Container from '../../../../src/web/components/container';
import Tips from '../../../../src/web/components/pages/tips';
import TipList from '../../../../src/web/components/tipList';

describe('Tips page component', () => {
  it('empty when not ready', () => {
    expect(shallow(
      <Tips
        onMount={() => {}}
        tips={[]}
      />
    ).node).to.equal(null);
  });

  it('renders content', () => {
    expect(shallow(
      <Tips
        onMount={() => {}}
        tips={[
          {
            id: 21,
            name: 'Foo',
            photos: [],
            text: 'Bar',
          },
          {
            id: 23,
            name: 'Boo',
            photos: [],
            text: 'Far',
          },
        ]}
        ready
      />
    ).node).to.eql(
      <Container>
        <h1>Tipy z Milevska</h1>
        <TipList
          tips={[
            {
              id: 21,
              name: 'Foo',
              photos: [],
              text: 'Bar',
            },
            {
              id: 23,
              name: 'Boo',
              photos: [],
              text: 'Far',
            },
          ]}
        />
      </Container>
    );
  });

  it('calls onMount on componentWillMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <Tips
        onMount={mountSpy}
        tips={[]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
  });
});
