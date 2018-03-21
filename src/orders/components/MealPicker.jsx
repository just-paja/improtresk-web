import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormErrors from '../../forms/containers/FormErrors';
import MealPickerItem from './MealPickerItem';

import { Meal } from '../../proptypes';

export default class MealPicker extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id, select) {
    const pass = select ?
      [...this.props.input.value, id] :
      this.props.input.value.filter(item => item !== id);
    this.props.input.onChange(pass);
  }

  render() {
    const {
      disabled,
      foodPickCloseDate,
      input,
      meals,
      meta,
    } = this.props;
    const foodPickClosed = foodPickCloseDate && moment().isAfter(foodPickCloseDate);

    if (foodPickClosed) {
      return (
        <Alert color="warning">
          Výběr jídla je v tuto chvíli již uzavřen.
        </Alert>
      );
    }

    return (
      <Col xs={12}>
        {meals.map(meal => (
          <MealPickerItem
            date={meal.date}
            disabled={disabled}
            form={meta.form}
            selected={input.value.indexOf(meal.id) > -1}
            key={meal.id}
            id={meal.id}
            name={meal.name}
            price={meal.price}
            onChange={this.handleChange}
          />
        ))}
        {meta.touched && meta.error ? (
          <FormFeedback>
            <FormErrors
              errors={meta.error}
              data={{ field: input.name }}
            />
          </FormFeedback>
        ) : null}
      </Col>
    );
  }
}

MealPicker.propTypes = {
  disabled: PropTypes.bool,
  foodPickCloseDate: PropTypes.string,
  input: PropTypes.object.isRequired,
  meals: PropTypes.arrayOf(Meal).isRequired,
  meta: PropTypes.object.isRequired,
};

MealPicker.defaultProps = {
  foodPickCloseDate: null,
  disabled: false,
};
