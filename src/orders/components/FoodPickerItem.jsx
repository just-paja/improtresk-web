import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardHeader from 'reactstrap/lib/CardHeader'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HumanDate from '../../components/HumanDate'
import InputRadioGroup from '../../forms/components/InputRadioGroup'
import styles from './FoodPickerItem.css'

const names = {
  lunch: 'Oběd',
  dinner: 'Večeře'
}

export default class FoodPickerItem extends Component {
  constructor () {
    super()
    this.handleChangeFood = this.handleChangeFood.bind(this)
    this.handleChangeSoup = this.handleChangeSoup.bind(this)
  }

  handleChangeSoup (name, value) {
    const { id, onChange, orderedFood } = this.props
    onChange(id, {
      food: orderedFood,
      soup: value
    })
  }

  handleChangeFood (name, value) {
    const { id, onChange, orderedSoup } = this.props
    onChange(id, {
      food: value,
      soup: orderedSoup
    })
  }

  render () {
    const {
      id,
      date,
      disabled,
      name,
      food,
      soups,
      orderedFood,
      orderedSoup
    } = this.props
    return (
      <Card className='mb-3'>
        <CardHeader>
          <strong>{names[name]} <HumanDate date={date} /></strong>
        </CardHeader>
        <CardBody className={styles.group}>
          <InputRadioGroup
            disabled={disabled}
            name={`soup_${id}`}
            label='Polévka'
            onChange={this.handleChangeSoup}
            options={soups}
            value={orderedSoup}
            required
          />
          <InputRadioGroup
            disabled={disabled}
            name={`food_${id}`}
            label='Hlavní chod'
            onChange={this.handleChangeFood}
            options={food}
            value={orderedFood}
            required
          />
        </CardBody>
      </Card>
    )
  }
}

FoodPickerItem.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  food: PropTypes.arrayOf(PropTypes.object).isRequired,
  soups: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderedSoup: PropTypes.number,
  orderedFood: PropTypes.number,
  date: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

FoodPickerItem.defaultProps = {
  disabled: false,
  orderedFood: null,
  orderedSoup: null
}
