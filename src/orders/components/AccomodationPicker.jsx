import Col from 'reactstrap/lib/Col';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccomodationPickerItem from './AccomodationPickerItem';

import { Accomodation } from '../../proptypes';

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
      <Col xs={12}>
        {accomodation.map(house => (
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
        ))}
      </Col>
    );
  }
}

AccomodationPicker.propTypes = {
  accomodation: PropTypes.arrayOf(Accomodation).isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

AccomodationPicker.defaultProps = {
  disabled: false,
  value: null,
};
