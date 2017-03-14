import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Well from 'react-bootstrap/lib/Well';

import Button from './button';
import InputCheckbox from './inputCheckbox';
import MealPicker from './mealPicker';
import WorkshopPicker from './workshopPicker';

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
    const { disabled, errors, meals, values, workshops } = this.props;
    return (
      <div>
        <h2>Přihlášení na workshop</h2>
        <p>
          Vyber si jeden workshop, víc jich za jeden Improtřesk nestihneš.
          Na workshop budeš místo na workshopu máš jisté až v momentě kdy nám
          přijdou peníze na účet.
        </p>
        <Form onSubmit={this.handleSubmit}>
          <WorkshopPicker
            disabled={disabled}
            name="workshop"
            onChange={this.handleChange}
            value={values.workshop}
            workshops={workshops}
          />
          <Well>
            <Row>
              <Col md={6}>
                <h3>Stravování</h3>
                <p>Zaškrtni na který den chceš zařídit jídlo od nás.</p>
                <MealPicker
                  name="meals"
                  meals={meals}
                  onChange={this.handleChange}
                  value={values.meals}
                />
              </Col>
              <Col md={6}>
                <h3>Ubytování</h3>
                <InputCheckbox
                  disabled={disabled}
                  name="accomodation"
                  label="Mám zájem o ubytování v hotelu"
                  error={errors.accomodation}
                  onChange={this.handleChange}
                  value={values.accomodation}
                />
              </Col>
            </Row>
          </Well>
          <Button type="submit">Pokračovat</Button>
        </Form>
      </div>
    );
  }
}

Order.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
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
