import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import Col from 'reactstrap/lib/Col'
import PropTypes from 'prop-types'
import React from 'react'
import Row from 'reactstrap/lib/Row'

import { Field } from 'redux-form'

import { Accomodation, FormGeneralError, Meal, Year, Workshop } from '../../proptypes'

import AccomodationPicker from './AccomodationPicker'
import Button from '../../components/Button'
import Form from '../../forms/components/Form'
import Message from '../../containers/Message'
import MealPicker from './MealPicker'
import Price from '../../components/Price'
import StayLengthPicker from './StayLengthPicker'
import WorkshopPicker from './WorkshopPicker'

const OrderForm = ({
  accomodation,
  error,
  foodPickCloseDate,
  form,
  meals,
  price,
  submit,
  submitting,
  workshopValue,
  workshops,
  year
}) => (
  <Form error={error} name={form} onSubmit={submit}>
    <Row>
      <Col className='mb-3' xs={12} xl={6}>
        <h3><Message name='orders.workshop' /></h3>
        <p><Message name='orders.workshopHelp' /></p>
        <Field
          allowEmpty={year.withoutWorkshop}
          component={WorkshopPicker}
          disabled={submitting}
          name='workshop'
          workshops={workshops}
        />
        {year.withoutWorkshop && !workshopValue ? (
          <div>
            <hr />
            <h3><Message name='orders.howLongStay' /></h3>
            <Field
              component={StayLengthPicker}
              disabled={submitting}
              end={year.endDate}
              name='stayLength'
              start={year.startDate}
            />
          </div>
        ) : null}
      </Col>
      <Col xs={12} xl={6}>
        <Row>
          {meals.length > 0 ? (
            <Col xs={12} md={6} xl={12}>
              <h3><Message name='orders.food' /></h3>
              <p><Message name='orders.foodHelp' /></p>
              <Field
                component={MealPicker}
                foodPickCloseDate={foodPickCloseDate}
                meals={meals}
                name='meals'
              />
            </Col>
          ) : null}
          <Col xs={12} md={6} xl={12}>
            <h3><Message name='orders.accomodation' /></h3>
            <p><Message name='orders.accomodationHelp' /></p>
            <Field
              component={AccomodationPicker}
              accomodation={accomodation}
              name='accomodation'
            />
          </Col>
        </Row>
      </Col>
    </Row>
    <Card className='mb-3'>
      <CardBody>
        <big>
          <Message name='orders.priceToPay' />:
          {' '}
          <Price price={price} />
        </big>
      </CardBody>
    </Card>
    <Button type='submit' loading={submitting}>
      <Message name='orders.continue' />
    </Button>
  </Form>
)

OrderForm.propTypes = {
  accomodation: PropTypes.arrayOf(Accomodation).isRequired,
  error: FormGeneralError,
  foodPickCloseDate: PropTypes.string,
  form: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(Meal).isRequired,
  price: PropTypes.number,
  submit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  workshops: PropTypes.arrayOf(Workshop).isRequired,
  workshopValue: PropTypes.number,
  year: Year.isRequired
}

OrderForm.defaultProps = {
  foodPickCloseDate: null,
  error: null,
  price: null,
  submitting: false,
  workshopValue: null
}

export default OrderForm
