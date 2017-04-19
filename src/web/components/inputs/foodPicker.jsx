import Col from 'react-bootstrap/lib/Col';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import FoodPickerItem from './foodPickerItem';

export default class FoodPicker extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { onChange } = this.props;
    onChange();
  }

  render() {
    const { disabled, meals, onChange, value } = this.props;
    return (
      <Row>
        {meals.map(meal =>
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
              onChange={onChange}
            />
          </Col>
        )}
      </Row>
    );
  }
}

FoodPicker.propTypes = {
  disabled: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    name: PropTypes.string,
    orderedFood: PropTypes.object,
    orderedSoup: PropTypes.object,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
};

FoodPicker.defaultProps = {
  error: null,
  disabled: false,
  value: {},
};
