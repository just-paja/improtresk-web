import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputCheckbox from '../../forms/components/InputCheckbox';
import Meal from '../../food/components/Meal';
import Price from '../../components/Price';

export default class MealPickerItem extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { id, onChange, selected } = this.props;
    onChange(id, !selected);
  }

  render() {
    const {
      date,
      disabled,
      form,
      id,
      name,
      price,
    } = this.props;
    return (
      <div>
        <InputCheckbox
          disabled={disabled}
          input={{
            name: id,
            onChange: this.handleChange,
            value: id,
          }}
          meta={{
            form,
            touched: true,
          }}
          label={(
            <div>
              <strong><Meal date={date} name={name} /></strong><br />
              <Price price={price} />
            </div>
          )}
        />
      </div>
    );
  }
}

MealPickerItem.propTypes = {
  date: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  form: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  selected: PropTypes.bool,
};

MealPickerItem.defaultProps = {
  disabled: false,
  selected: false,
};
