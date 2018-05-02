import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import Message from '../../containers/Message';
import OrderedMeal from './OrderedMeal';

const FoodSummary = ({
  closed,
  meals,
}) => (meals.length === 0 ? <div><Message name="orders.foodNotOrdered" /></div> : (
  <Row>
    {meals.map(meal => (
      <Col className="mb-3" key={meal.id} lg={6}>
        <OrderedMeal
          date={meal.date}
          food={meal.orderedFood ? meal.orderedFood.name : null}
          name={meal.name}
          soup={meal.orderedSoup ? meal.orderedSoup.name : null}
          useDefault={closed}
        />
      </Col>
    ))}
  </Row>
));

FoodSummary.propTypes = {
  closed: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FoodSummary.defaultProps = {
  closed: false,
};

export default FoodSummary;
