import React, { Component, PropTypes } from 'react';

import Meal from './meal';
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
      name,
      selected,
    } = this.props;
    return (
      <div>
        <InputCheckbox
          name={name}
          onChange={this.handleChange}
          label={<Meal date={date} name={name} />}
          value={selected}
        />
      </div>
    );
  }
}

MealPickerItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

MealPickerItem.defaultProps = {
  selected: false,
};
