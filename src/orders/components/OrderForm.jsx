import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import AccomodationPicker from './AccomodationPicker';
import Button from '../../components/Button';
import Link from '../../containers/Link';
import MealPicker from './MealPicker';
import Price from '../../components/Price';
import WorkshopPicker from './WorkshopPicker';

import { Accomodation, Meal, Workshop } from '../../proptypes';

export default class OrderForm extends Component {
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
    const {
      accomodation,
      disabled,
      errors,
      foodPickCloseDate,
      meals,
      price,
      submitted,
      translate,
      values,
      workshops,
    } = this.props;
    return (
      <div>
        <h2>{translate('orders.workshop')}</h2>
        <p>{translate('orders.workshopHelp')}</p>
        <Form onSubmit={this.handleSubmit}>
          <WorkshopPicker
            disabled={disabled}
            name="workshop"
            onChange={this.handleChange}
            error={errors.workshop}
            touched={submitted}
            value={values.workshop}
            workshops={workshops}
          />
          <div className="former-well">
            <Row>
              <Col sm={6} lg={4}>
                <h3><Link to="food">{translate('orders.food')}</Link></h3>
                <p>{translate('orders.foodHelp')}</p>
                <MealPicker
                  disabled={disabled}
                  foodPickCloseDate={foodPickCloseDate}
                  name="meals"
                  meals={meals}
                  onChange={this.handleChange}
                  error={errors.meals}
                  value={values.meals}
                />
              </Col>
              <Col sm={6} lg={4}>
                <h3><Link to="accomodation">{translate('orders.accomodation')}</Link></h3>
                <p>{translate('orders.accomodationHelp')}</p>
                <AccomodationPicker
                  accomodation={accomodation}
                  disabled={disabled}
                  error={errors.accomodation}
                  onChange={this.handleChange}
                  name="accomodation"
                  value={values.accomodation}
                />
              </Col>
            </Row>
          </div>
          <Row>
            <Col sm={6} lg={4}>
              <h3>{translate('orders.paymentMethod')}</h3>
              <p>
                {translate('orders.paymentMethod')}
                <FontAwesome name="frown-o" />
              </p>
              {price ? (
                <Alert bsStyle="success">
                  <big>
                    {translate('orders.priceToPay')}:
                    {' '}
                    <Price price={price} />
                  </big>
                </Alert>
              ) : null}
            </Col>
          </Row>
          <Button type="submit">{translate('orders.continue')}</Button>
        </Form>
      </div>
    );
  }
}

OrderForm.propTypes = {
  accomodation: PropTypes.arrayOf(Accomodation).isRequired,
  price: PropTypes.number,
  disabled: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  foodPickCloseDate: PropTypes.string,
  form: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(Meal).isRequired,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool,
  translate: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  workshops: PropTypes.arrayOf(Workshop).isRequired,
};

OrderForm.defaultProps = {
  disabled: false,
  foodPickCloseDate: null,
  price: null,
  submitted: false,
};
