import React, { Component, PropTypes } from 'react';

import Meal from './meal';
import Price from './price';
import InputCheckbox from './inputCheckbox';

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
      name,
      price,
      selected,
    } = this.props;
    return (
      <div>
        <InputCheckbox
          disabled={disabled}
          name={name}
          onChange={this.handleChange}
          label={(
            <div>
              <strong><Meal date={date} name={name} /></strong><br />
              <Price price={price} />
            </div>
          )}
          value={selected}
        />
      </div>
    );
  }
}

MealPickerItem.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

MealPickerItem.defaultProps = {
  disabled: false,
  selected: false,
};
