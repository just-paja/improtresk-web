import Breadcrumb from 'reactstrap/lib/Breadcrumb'
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem'
import Col from 'reactstrap/lib/Col'
import PropTypes from 'prop-types'
import React from 'react'
import Row from 'reactstrap/lib/Row'

import Container from '../../components/Container'
import HelmetTitle from '../../containers/HelmetTitle'
import Link from '../../containers/Link'
import Message from '../../containers/Message'
import ChangePasswordForm from '../../participants/containers/ChangePasswordForm'

const ChangePasswordPage = ({ translate }) => (
  <Container>
    <HelmetTitle title={translate('pages.changePassword')} />
    <Row>
      <Col md={{ size: 6, offset: 3 }}>
        <h1><Message name='participants.changePassword' /></h1>
        <p>
          <Message name='participants.changePasswordHelp' />
        </p>
        <ChangePasswordForm />
      </Col>
    </Row>
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to='participantHome'><Message name='participants.home' /></Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        <Message name='participants.changePassword' />
      </BreadcrumbItem>
    </Breadcrumb>
  </Container>
)

ChangePasswordPage.propTypes = {
  translate: PropTypes.func.isRequired
}

export default ChangePasswordPage
