import Alert from 'react-bootstrap/lib/Alert';
import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Well from 'react-bootstrap/lib/Well';

import Button from './button';
import InputCheckbox from './inputCheckbox';
import MealPicker from './mealPicker';
import Price from './price';
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
    const { price, disabled, errors, meals, values, workshops } = this.props;
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
            error={errors.workshop}
            value={values.workshop}
            workshops={workshops}
          />
          <Well>
            <Row>
              <Col sm={6} lg={4}>
                <h3>Stravování</h3>
                <p>
                  Zaškrtni na který den chceš zařídit jídlo od nás. Na výběr z
                  jídelního menu a dostaneš před začátkem festivalu.
                </p>
                <MealPicker
                  disabled={disabled}
                  name="meals"
                  meals={meals}
                  onChange={this.handleChange}
                  error={errors.meals}
                  value={values.meals}
                />
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
              <Col sm={6} lg={4}>
                <h3>Metoda platby</h3>
                <p>
                  V tuto chvíli je možné platit jedině bankovním
                  převodem <FontAwesome name="frown-o" />. Detaily
                  platby jsou v dalším kroku objednávky.
                </p>
                {price ? (
                  <Alert bsStyle="info">
                    <big>
                      Částka k zaplacení:
                      {' '}
                      <Price price={price} />
                    </big>
                  </Alert>
                ) : null}
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
  price: PropTypes.number,
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
  price: null,
  disabled: false,
};
