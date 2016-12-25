import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ObjectList from '../../../src/web/components/objectList';
import Tip from '../../../src/web/components/tip';

const component = Tip;

describe('Tip List component', () => {
  it('renders', () => {
    expect(shallow(
      <ObjectList
        component={Tip}
        data={[
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
          <component
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
