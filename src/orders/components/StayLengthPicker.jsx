import moment from 'moment-timezone';

import Col from 'reactstrap/lib/Col';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import Row from 'reactstrap/lib/Row';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormErrors from '../../forms/containers/FormErrors';
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

  handleChange(event) {
    const { value } = event.target;
    let nextValue;
    if (this.props.input.value) {
      if (this.props.input.value.indexOf(value) === -1) {
        nextValue = this.props.input.value.concat([value]);
      } else {
        nextValue = this.props.input.value.filter(item => item !== value);
      }
    } else {
      nextValue = [value];
    }
    this.props.input.onChange(nextValue);
  }

  render() {
    const { disabled, input, meta } = this.props;
    const dates = this.getDates();
    return (
      <div>
        <Col style={{ padding: '0 20px' }}>
          <Row>
            {dates.map(date => (
              <Col key={date} xs={12} md={4}>
                <InputCheckbox
                  disabled={disabled}
                  checked={input.value && input.value.indexOf(date) !== -1}
                  input={{
                    value: date,
                    name: date,
                    onChange: this.handleChange,
                  }}
                  meta={{}}
                  label={moment(date).format('L')}
                  rawLabel
                />
              </Col>
            ))}
          </Row>
        </Col>
        {meta.touched && meta.error ? (
          <FormFeedback>
            <FormErrors
              errors={meta.error}
              data={{ field: input.name }}
            />
          </FormFeedback>
        ) : null}
      </div>
    );
  }
}

StayLengthPicker.propTypes = {
  disabled: PropTypes.bool,
  end: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  start: PropTypes.string.isRequired,
};

StayLengthPicker.defaultProps = {
  disabled: false,
};
