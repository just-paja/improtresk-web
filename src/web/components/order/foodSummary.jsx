import Col from 'react-bootstrap/lib/Col';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import OrderedMeal from './orderedMeal';

const defaultFood = <small className="text-muted">Výchozí</small>;

const FoodSummary = ({
  closed,
  meals,
}) => (
  meals.length ?
    (
      <Row>
        {meals.map((meal) => {
          let food = closed ? defaultFood : null;
          let soup = closed ? defaultFood : null;

          if (meal.orderedFood) {
            food = meal.orderedFood.name;
          }

          if (meal.orderedSoup) {
            soup = meal.orderedSoup.name;
          }

          return (
            <Col key={meal.id} sm={4}>
              <OrderedMeal
                name={meal.name}
                date={meal.date}
                food={food}
                soup={soup}
              />
            </Col>
          );
        })}
      </Row>
    ) :
    (
      <div>Neobjednáno</div>
    )
  );

FoodSummary.propTypes = {
  closed: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FoodSummary.defaultProps = {
  closed: false,
};

export default FoodSummary;
