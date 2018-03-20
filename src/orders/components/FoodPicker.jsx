import Col from 'reactstrap/lib/Col';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import FoodPickerItem from './FoodPickerItem';

export default class FoodPicker extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id, mealValue) {
    const { name, onChange, value } = this.props;
    onChange(name, {
      ...value,
      [id]: mealValue,
    });
  }

  render() {
    const { disabled, meals, value } = this.props;
    return (
      <Row>
        {meals.map(meal => (
          <Col key={meal.id} sm={4}>
            <FoodPickerItem
              date={meal.date}
              disabled={disabled}
              key={meal.id}
              id={meal.id}
              name={meal.name}
              food={meal.food}
              soups={meal.soups}
              orderedFood={value[meal.id] && value[meal.id].food && value[meal.id].food}
              orderedSoup={value[meal.id] && value[meal.id].soup && value[meal.id].soup}
              onChange={this.handleChange}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

FoodPicker.propTypes = {
  disabled: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    name: PropTypes.string,
    food: PropTypes.arrayOf(PropTypes.object),
    soups: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
};

FoodPicker.defaultProps = {
  disabled: false,
  value: {},
};
