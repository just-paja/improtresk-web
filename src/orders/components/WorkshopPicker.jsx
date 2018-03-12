import Alert from 'reactstrap/lib/Alert';
import ListGroup from 'reactstrap/lib/ListGroup';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WorkshopPickerItem from './WorkshopPickerItem';

export default class WorkshopPicker extends Component {
  constructor() {
    super();
    this.state = {
      touched: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.state.touched = true;
    this.props.onChange(this.props.name, value);
  }

  render() {
    const { disabled, error, touched, workshops, value } = this.props;
    return (
      <div>
        <ListGroup>
          {workshops
            .map(workshop => (
              <WorkshopPickerItem
                assigned={workshop.capacityStatus.assigned}
                capacity={workshop.capacityStatus.capacity}
                disabled={
                  disabled ||
                  workshop.capacityStatus.fullyAssigned ||
                  workshop.capacityStatus.fullyReserved
                }
                freeSpots={workshop.capacityStatus.freeSpots}
                id={workshop.id}
                key={workshop.id}
                lectors={workshop.lectors}
                name={workshop.name}
                onChange={this.handleChange}
                reserved={workshop.capacityStatus.reserved}
                selected={value === workshop.id}
              />
            ))
          }
        </ListGroup>
        <hr />
        <WorkshopPickerItem
          name="Jedu bez workshopu"
          selected={value === null}
          freeSpots={1000}
          onChange={this.handleChange}
          lectors={[]}
          id={null}
        />
        {(touched || this.state.touched) && error ? (
          <Alert color="danger">{error}</Alert>
        ) : null}
      </div>
    );
  }
}

WorkshopPicker.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  touched: PropTypes.bool,
  value: PropTypes.number,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

WorkshopPicker.defaultProps = {
  disabled: false,
  error: null,
  touched: false,
  value: null,
};
