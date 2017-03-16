import FormGroup from 'react-bootstrap/lib/FormGroup';
import React, { Component, PropTypes } from 'react';

import InputRadio from './inputRadio';
import Price from './price';

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
              <Price price={price} /> {price ? 'za noc' : null}
            </div>
          )}
          value={selected}
        />
      </FormGroup>
    );
  }
}

AccomodationPickerItem.propTypes = {
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
