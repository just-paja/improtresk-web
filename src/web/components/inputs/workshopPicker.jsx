import Alert from 'react-bootstrap/lib/Alert';
import Col from 'react-bootstrap/lib/Col';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import WorkshopPickerItem from './workshopPickerItem';

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
            <Col sm={6} lg={4}>
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
            <Alert bsStyle="danger">{error}</Alert>
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
