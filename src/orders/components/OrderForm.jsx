import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';

import AccomodationPicker from './AccomodationPicker';
import Button from '../../components/Button';
import Message from '../../containers/Message';
import MealPicker from './MealPicker';
import Price from '../../components/Price';
import WorkshopPicker from './WorkshopPicker';

import { Accomodation, FormData, Meal, Workshop } from '../../proptypes';

export default class OrderForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.props.onChange(this.props.formData.formName, name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.formData.formName);
  }

  render() {
    const {
      accomodation,
      foodPickCloseDate,
      formData,
      meals,
      price,
      workshops,
    } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col className="mb-3" xs={12} xl={6}>
              <h3><Message name="orders.workshop" /></h3>
              <p><Message name="orders.workshopHelp" /></p>
              <WorkshopPicker
                disabled={formData.loading}
                name="workshop"
                onChange={this.handleChange}
                error={formData.fieldErrors.workshop}
                touched={formData.submitted}
                value={formData.values.workshop}
                workshops={workshops}
              />
            </Col>
            <Col xs={12} xl={6}>
              <Row>
                <Col xs={12} md={6} xl={12}>
                  <h3><Message name="orders.food" /></h3>
                  <p><Message name="orders.foodHelp" /></p>
                  <MealPicker
                    disabled={formData.loading}
                    foodPickCloseDate={foodPickCloseDate}
                    name="meals"
                    meals={meals}
                    onChange={this.handleChange}
                    error={formData.fieldErrors.meals}
                    value={formData.values.meals}
                  />
                </Col>
                <Col xs={12} md={6} xl={12}>
                  <h3><Message name="orders.accomodation" /></h3>
                  <p><Message name="orders.accomodationHelp" /></p>
                  <AccomodationPicker
                    accomodation={accomodation}
                    disabled={formData.loading}
                    error={formData.fieldErrors.accomodation}
                    onChange={this.handleChange}
                    name="accomodation"
                    value={formData.values.accomodation}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <big>
                <Message name="orders.priceToPay" />:
                {' '}
                <Price price={price} />
              </big>
            </CardBody>
          </Card>
          <Button type="submit"><Message name="orders.continue" /></Button>
        </Form>
      </div>
    );
  }
}

OrderForm.propTypes = {
  accomodation: PropTypes.arrayOf(Accomodation).isRequired,
  formData: FormData.isRequired,
  price: PropTypes.number,
  foodPickCloseDate: PropTypes.string,
  meals: PropTypes.arrayOf(Meal).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  workshops: PropTypes.arrayOf(Workshop).isRequired,
};

OrderForm.defaultProps = {
  foodPickCloseDate: null,
  price: null,
};
