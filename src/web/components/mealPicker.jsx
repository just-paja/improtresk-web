import React, { Component, PropTypes } from 'react';

import MealPickerItem from './mealPickerItem';

export default class MealPicker extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id, select) {
    const pass = select ?
      [...this.props.value, id] :
      this.props.value.filter(item => item !== id);
    this.props.onChange(this.props.name, pass);
  }

  render() {
    const { disabled, meals, value } = this.props;
    return (
      <div>
        {meals.map(meal =>
          <MealPickerItem
            date={meal.date}
            disabled={disabled}
            selected={value.indexOf(meal.id) > -1}
            key={meal.id}
            id={meal.id}
            name={meal.name}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

MealPicker.propTypes = {
  disabled: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
};

MealPicker.defaultProps = {
  error: null,
  disabled: false,
  value: [],
};
