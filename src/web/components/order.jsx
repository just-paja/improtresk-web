import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';

import WorkshopPicker from './workshopPicker';

export default class Order extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.props.onChange(this.props.form, name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.form);
  }

  render() {
    const { workshops, values } = this.props;
    return (
      <div>
        <h2>Vyber si workshop</h2>
        <p>Vyber si jeden workshop, víc jich za jeden Improtřesk nestihneš.</p>
        <Form onSubmit={this.handleSubmit}>
          <WorkshopPicker
            name="workshop"
            onChange={this.handleChange}
            value={values.workshop}
            workshops={workshops}
          />
        </Form>
      </div>
    );
  }
}

Order.propTypes = {
  form: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};
