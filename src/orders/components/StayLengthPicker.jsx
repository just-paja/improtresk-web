import moment from 'moment-timezone';

import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputCheckbox from '../../forms/components/InputCheckbox';

export default class StayLengthPicker extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  getDates() {
    const current = moment(this.props.start);
    const end = moment(this.props.end);
    const dates = [];
    while (!current.isAfter(end)) {
      dates.push(current.format('YYYY-MM-DD'));
      current.add(1, 'days');
    }
    return dates;
  }

  handleChange(value) {
    let nextValue;
    if (this.props.value) {
      if (this.props.value.indexOf(value) === -1) {
        nextValue = this.props.value.concat([value]);
      } else {
        nextValue = this.props.value.filter(item => item !== value);
      }
    } else {
      nextValue = [value];
    }
    this.props.onChange(this.props.name, nextValue);
  }

  render() {
    const { disabled, value } = this.props;
    const dates = this.getDates();
    return (
      <Col style={{ padding: '0 20px' }}>
        <Row>
          {dates.map(date => (
            <Col key={date} xs={12} md={4}>
              <InputCheckbox
                disabled={disabled}
                value={value && value.indexOf(date) !== -1}
                id={date}
                name={date}
                label={moment(date).format('L')}
                onChange={this.handleChange}
              />
            </Col>
          ))}
        </Row>
      </Col>
    );
  }
}

StayLengthPicker.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
};

StayLengthPicker.defaultProps = {
  disabled: false,
  value: null,
};
