import Col from 'react-bootstrap/lib/Col';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import OrderedMeal from './orderedMeal';

const FoodSummary = ({
  meals,
}) => (
  meals.length ?
    (
      <Row>
        {meals.map(meal => (
          <Col key={meal.id} sm={4}>
            <OrderedMeal
              name={meal.name}
              date={meal.date}
              food={meal.orderedFood ? meal.orderedFood.name : null}
              soup={meal.orderedSoup ? meal.orderedSoup.name : null}
            />
          </Col>
        ))}
      </Row>
    ) :
    (
      <div>Neobjednáno</div>
    )
  );

FoodSummary.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FoodSummary;
