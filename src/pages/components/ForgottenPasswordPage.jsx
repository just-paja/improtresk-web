import Col from 'reactstrap/lib/Col'
import React from 'react'
import Row from 'reactstrap/lib/Row'

import Container from '../../components/Container'
import Message from '../../containers/Message'
import ResetPasswordForm from '../../participants/containers/ResetPasswordForm'

const ForgottenPasswordPage = () => (
  <Container>
    <Row>
      <Col md={{ size: 6, offset: 3 }}>
        <h1><Message name='participants.forgottenPassword' /></h1>
        <p>
          <Message name='participants.forgottenPasswordHelp' />
        </p>
        <ResetPasswordForm />
      </Col>
    </Row>
  </Container>
)

export default ForgottenPasswordPage
