import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import { Meal } from '../../proptypes';

import FoodMenu from './FoodMenu';
import Message from '../../containers/Message';

const MealList = ({ mealList }) => {
  if (mealList.length === 0) {
    return (
      <Alert color="info">
        <Message name="food.festivalMenuEmpty" />
      </Alert>
    );
  }
  return (
    <Row>
      {mealList.map(meal => (
        <Col key={meal.id} xs={12} md={6}>
          <FoodMenu
            date={meal.date}
            food={meal.food}
            id={meal.id}
            name={meal.name}
            soups={meal.soups}
          />
        </Col>
      ))}
    </Row>
  );
};

MealList.propTypes = {
  mealList: PropTypes.arrayOf(Meal).isRequired,
};

export default MealList;
