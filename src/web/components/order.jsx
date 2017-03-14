import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';

import WorkshopPicker from './workshopPicker';
import InputCheckbox from './inputCheckbox';

export default class Order extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  handleChange(name, value) {
    this.props.onChange(this.props.form, name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.form);
  }

  render() {
    const { disabled, errors, values, workshops } = this.props;
    return (
      <div>
        <h2>Přihlášení na workshop</h2>
        <p>
          Vyber si jeden workshop, víc jich za jeden Improtřesk nestihneš.
          Na workshop budeš místo na workshopu máš jisté až v momentě kdy nám
          přijdou peníze na účet.
        </p>
        <Form onSubmit={this.handleSubmit}>
          <Well>
            <WorkshopPicker
              disabled={disabled}
              name="workshop"
              onChange={this.handleChange}
              value={values.workshop}
              workshops={workshops}
            />
          </Well>
          <InputCheckbox
            disabled={disabled}
            name="accomodation"
            label="Mám zájem o ubytování v hotelu"
            error={errors.accomodation}
            onChange={this.handleChange}
            value={values.accomodation}
          />
        </Form>
      </div>
    );
  }
}

Order.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Order.defaultProps = {
  disabled: false,
};
