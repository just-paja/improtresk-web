import React, { Component, PropTypes } from 'react';

import AccomodationPickerItem from './accomodationPickerItem';

export default class AccomodationPicker extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.onChange(this.props.name, value);
  }

  render() {
    const { disabled, name, accomodation, value } = this.props;
    return (
      <div>
        {accomodation.map(house =>
          <AccomodationPickerItem
            disabled={disabled}
            selected={value === house.id}
            key={house.id}
            id={house.id}
            name={house.name}
            parentName={name}
            price={house.price}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

AccomodationPicker.propTypes = {
  disabled: PropTypes.bool,
  accomodation: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
};

AccomodationPicker.defaultProps = {
  error: null,
  disabled: false,
  value: [],
};
