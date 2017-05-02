import Alert from 'react-bootstrap/lib/Alert';
import moment from 'moment';
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
    const { disabled, foodPickCloseDate, meals, value } = this.props;
    const foodPickClosed = foodPickCloseDate && moment().isAfter(foodPickCloseDate);

    if (foodPickClosed) {
      return (
        <Alert bsStyle="warning">
          Výběr jídla je v tuto chvíli již uzavřen.
        </Alert>
      );
    }

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
            price={meal.price}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

MealPicker.propTypes = {
  disabled: PropTypes.bool,
  foodPickCloseDate: PropTypes.string,
  meals: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
};

MealPicker.defaultProps = {
  error: null,
  foodPickCloseDate: null,
  disabled: false,
  value: [],
};
