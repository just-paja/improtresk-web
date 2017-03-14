import Alert from 'react-bootstrap/lib/Alert';
import React, { PropTypes } from 'react';

import FoodMenuItem from './foodMenuItem';
import Meal from './meal';
import ObjectList from './objectList';

const FoodMenu = ({ id, name, date, food, soups }) => (
  <div key={id}>
    <h3><Meal name={name} date={date} /></h3>
    <ObjectList
      Component={FoodMenuItem}
      data={soups}
      md={12}
    />
    <ObjectList
      Component={FoodMenuItem}
      data={food}
      md={12}
    />
    {(!soups.length || !food.length) ? (
      <Alert bsStyle="info">Jídelníček pro tento den ještě připravujeme</Alert>
    ) : null}
  </div>
);

FoodMenu.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  food: PropTypes.arrayOf(PropTypes.object).isRequired,
  soups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FoodMenu;
