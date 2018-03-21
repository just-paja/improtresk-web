import FormGroup from 'reactstrap/lib/FormGroup';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CapacityStatus } from '../../proptypes';

import Capacity from '../../components/Capacity';
import InputRadio from '../../forms/components/InputRadio';
import Price from '../../components/Price';

export default class AccomodationPickerItem extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { id, onChange } = this.props;
    onChange(id);
  }

  render() {
    const {
      capacityStatus,
      disabled,
      name,
      price,
      parentName,
      selected,
    } = this.props;
    return (
      <FormGroup>
        <InputRadio
          disabled={disabled}
          name={parentName}
          onChange={this.handleChange}
          label={(
            <div>
              <strong>{name}</strong><br />
              <Price price={price} /> {price ? 'za noc' : null}<br />
              <Capacity {...capacityStatus} />
            </div>
          )}
          value={selected}
        />
      </FormGroup>
    );
  }
}

AccomodationPickerItem.propTypes = {
  capacityStatus: CapacityStatus.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  parentName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

AccomodationPickerItem.defaultProps = {
  disabled: false,
  selected: false,
};
