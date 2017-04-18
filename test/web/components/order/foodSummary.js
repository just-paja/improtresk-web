import Col from 'react-bootstrap/lib/Col';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import OrderedMeal from '../../../../src/web/components/order/orderedMeal';
import FoodSummary from '../../../../src/web/components/order/foodSummary';

describe('FoodSummary component', () => {
  it('renders', () => {
    expect(shallow(
      <FoodSummary
        meals={[
          {
            name: 'lunch',
            date: '2016-01-02',
            orderedSoup: { name: 'Květáková' },
            orderedFood: { name: 'Svíčková' },
          },
          {
            name: 'dinner',
            date: '2016-01-02',
            orderedFood: { name: 'Svíčková' },
          },
        ]}
      />
    ).node).to.eql(
      <Row>
        <Col sm={4}>
          <OrderedMeal
            name="lunch"
            date="2016-01-02"
            soup="Květáková"
            food="Svíčková"
          />
        </Col>
        <Col sm={4}>
          <OrderedMeal
            name="dinner"
            date="2016-01-02"
            food="Svíčková"
          />
        </Col>
      </Row>
    );
  });
});
