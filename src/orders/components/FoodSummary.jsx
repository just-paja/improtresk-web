import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import OrderedMeal from './OrderedMeal';

const FoodSummary = ({
  closed,
  meals,
  translate,
}) => (meals.length === 0 ? <div>{translate('orders.foodNotOrdered')}</div> : (
  <Row>
    {meals.map(meal => (
      <Col key={meal.id} sm={4}>
        <OrderedMeal
          date={meal.date}
          food={meal.orderedFood ? meal.orderedFood.name : null}
          name={meal.name}
          soup={meal.orderedSoup ? meal.orderedSoup.name : null}
          translate={translate}
          useDefault={closed}
        />
      </Col>
    ))}
  </Row>
));

FoodSummary.propTypes = {
  closed: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  translate: PropTypes.func.isRequired,
};

FoodSummary.defaultProps = {
  closed: false,
};

export default FoodSummary;
