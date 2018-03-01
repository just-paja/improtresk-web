import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

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
      <Row>
        {workshops
          .map(workshop => (
            <Col key={workshop.id} sm={6} lg={4}>
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
            </Col>
          ))
        }
        {(touched || this.state.touched) && error ? (
          <Col xs={12}>
            <Alert color="danger">{error}</Alert>
          </Col>
        ) : null}
      </Row>
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
