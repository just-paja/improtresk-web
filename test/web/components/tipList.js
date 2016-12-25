import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Tip from '../../../src/web/components/tip';
import TipList from '../../../src/web/components/tipList';

describe('Tip List component', () => {
  it('renders', () => {
    expect(shallow(
      <TipList
        tips={[
          {
            id: 21,
            name: 'Foo',
            photos: [],
            text: 'Bar',
          },
        ]}
      />
    ).node).to.eql(
      <Row>
        <Col key={21} md={6}>
          <Tip
            id={21}
            name="Foo"
            photos={[]}
            text="Bar"
          />
        </Col>
      </Row>
    );
  });
});
