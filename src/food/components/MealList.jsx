import Alert from 'reactstrap/lib/Alert';
import PropTypes from 'prop-types';
import React from 'react';

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
    <div>
      {mealList.map(meal => (
        <FoodMenu
          date={meal.date}
          food={meal.food}
          id={meal.id}
          key={meal.id}
          name={meal.name}
          soups={meal.soups}
        />
      ))}
    </div>
  );
};

MealList.propTypes = {
  mealList: PropTypes.arrayOf(Meal).isRequired,
};

export default MealList;
