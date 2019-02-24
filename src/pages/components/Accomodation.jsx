import Breadcrumb from 'reactstrap/lib/Breadcrumb'
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem'
import React from 'react'
import PropTypes from 'prop-types'

import AccomodationList from '../../accomodation/containers/AccomodationList'
import HelmetTitle from '../../containers/HelmetTitle'
import Container from '../../components/Container'
import Message from '../../containers/Message'
import TextAccomodation from '../../texts/containers/TextAccomodation'

const Accomodation = ({ translate }) => (
  <Container>
    <HelmetTitle title={translate('pages.accomodation')} />
    <h1><Message name='pages.accomodation' /></h1>
    <TextAccomodation skipFirstHeading />
    <AccomodationList />
    <Breadcrumb>
      <BreadcrumbItem>
        <Message name='pages.forParticipants' />
      </BreadcrumbItem>
      <BreadcrumbItem active>
        <Message name='pages.accomodation' />
      </BreadcrumbItem>
    </Breadcrumb>
  </Container>
)

Accomodation.propTypes = {
  translate: PropTypes.func.isRequired
}

export default Accomodation
