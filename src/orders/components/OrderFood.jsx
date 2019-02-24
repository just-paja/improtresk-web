import Alert from 'reactstrap/lib/Alert'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardFooter from 'reactstrap/lib/CardFooter'
import CardHeader from 'reactstrap/lib/CardHeader'
import PropTypes from 'prop-types'
import React from 'react'

import { Order } from '../../proptypes'

import Flex from '../../components/Flex'
import FoodSummary from './FoodSummary'
import Meal from '../../food/components/Meal'
import Message from '../../containers/Message'
import IconMessage from '../../components/IconMessage'
import Link from '../../containers/Link'

const isFoodSelected = meals => meals.every(meal => meal.orderedFood && meal.orderedSoup)

const renderFoodList = (order, openFoodSelection) => {
  if (order.confirmed) {
    return <FoodSummary closed={!openFoodSelection} meals={order.meals} />
  }
  return (
    <ul className='list-unstyled'>
      {order.meals.map(meal => (
        <li key={meal.date}><Meal name={meal.name} date={meal.date} /></li>
      ))}
    </ul>
  )
}

const renderFoodFooter = (order, isFoodPickingAllowed) => {
  let alert
  const foodSelected = isFoodSelected(order.meals)

  if (order.meals.length === 0) {
    alert = (
      <Alert color='info'>
        <IconMessage icon='check-circle' name='orders.foodNotOrdered' />
      </Alert>
    )
  } else if (foodSelected) {
    alert = (
      <Alert color='success'>
        <IconMessage icon='check-circle' name='orders.foodOk' />
      </Alert>
    )
  } else if (isFoodPickingAllowed) {
    alert = (
      <Alert color='danger'>
        <IconMessage icon='cutlery' name='orders.foodSelectionRequired' />{' '}
        <Link to='participantChangeFood'>
          <Message name='orders.foodSelection' />
        </Link>
      </Alert>
    )
  } else {
    alert = (
      <Alert color='warning'>
        <IconMessage icon='exclamation-triangle' name='orders.foodSelectionDisabled' />
      </Alert>
    )
  }
  return <CardFooter>{alert}</CardFooter>
}

const OrderFood = ({
  isFoodPickingAllowed,
  order
}) => {
  if (!order) {
    return null
  }
  return (
    <Card className='mb-4'>
      <CardHeader>
        <Flex justify='between'>
          <IconMessage icon='cutlery' name='orders.food' />
          {order.confirmed && isFoodPickingAllowed && order.meals.length ? (
            <Link to='participantChangeFood'><Message name='orders.changeFood' /></Link>
          ) : null}
        </Flex>
      </CardHeader>
      {order.meals.length !== 0 ? (
        <CardBody>
          {renderFoodList(order, isFoodPickingAllowed)}
        </CardBody>
      ) : null}
      {renderFoodFooter(order, isFoodPickingAllowed)}
    </Card>
  )
}

OrderFood.propTypes = {
  order: Order,
  isFoodPickingAllowed: PropTypes.bool
}

OrderFood.defaultProps = {
  order: null,
  isFoodPickingAllowed: false
}

export default OrderFood
