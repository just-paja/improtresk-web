import Col from 'react-bootstrap/lib/Col';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import WorkshopPickerItem from './workshopPickerItem';

export default class WorkshopPicker extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.onChange(this.props.name, value);
  }

  render() {
    const { workshops, value } = this.props;
    return (
      <Row>
        {workshops.map(workshop => (
          <Col key={workshop.id} sm={6} lg={4}>
            <WorkshopPickerItem
              assigned={workshop.assigned}
              capacity={workshop.capacity}
              freeSpots={workshop.freeSpots}
              id={workshop.id}
              lectors={workshop.lectors}
              name={workshop.name}
              onChange={this.handleChange}
              reserved={workshop.reserved}
              selected={value === workshop.id}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

WorkshopPicker.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

WorkshopPicker.defaultProps = {
  value: null,
};
