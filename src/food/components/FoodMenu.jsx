import Alert from 'reactstrap/lib/Alert';
import PropTypes from 'prop-types';
import React from 'react';

import FoodMenuItem from './FoodMenuItem';
import Meal from './Meal';
import ObjectList from '../../components/ObjectList';

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
      <Alert color="info">Jídelníček pro tento den ještě připravujeme</Alert>
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
