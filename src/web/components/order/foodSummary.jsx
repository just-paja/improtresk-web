import React, { PropTypes } from 'react';

import OrderedMeal from './orderedMeal';

const FoodSummary = ({
  meals,
}) => (
  <div>
    {meals.map(meal => (
      <OrderedMeal
        key={meal.id}
        name={meal.name}
        date={meal.date}
        food={meal.food ? meal.food.name : null}
        soup={meal.soup ? meal.soup.name : null}
      />
    ))}
  </div>
);

FoodSummary.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FoodSummary;
