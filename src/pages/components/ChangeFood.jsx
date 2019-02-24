import Breadcrumb from 'reactstrap/lib/Breadcrumb'
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem'
import React from 'react'

import Container from '../../components/Container'
import Message from '../../containers/Message'
import Link from '../../containers/Link'
import FoodForm from '../../orders/containers/FoodForm'

const ChangeFoodPage = () => (
  <Container>
    <h1><Message name='orders.changeFood' /></h1>
    <FoodForm />
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to='participantHome'><Message name='participants.home' /></Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        <Message name='orders.changeFood' />
      </BreadcrumbItem>
    </Breadcrumb>
  </Container>
)

export default ChangeFoodPage
