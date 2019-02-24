import Alert from 'reactstrap/lib/Alert'
import Col from 'reactstrap/lib/Col'
import React from 'react'
import Row from 'reactstrap/lib/Row'

import Link from '../../containers/Link'
import Message from '../../containers/Message'

const SignupHowto = () => (
  <div>
    <h2><Message name='participants.signupHowtoHeading' /></h2>
    <p>
      <Message name='participants.signupHowtoProcess' />
    </p>
    <Row>
      <Col xs={12} lg={6}>
        <h4><Message name='participants.signupRegistrationHeading' /></h4>
        <p>
          <Message name='participants.signupRegistrationInfo' />
        </p>
        <p>
          <Link to='conditions'><Message name='participants.festivalTerms' /></Link>
        </p>
      </Col>
      <Col xs={12} lg={6}>
        <h4>
          <Message name='participants.workshopRegistrationHeading' />
        </h4>
        <p>
          <Message name='participants.workshopRegistrationProcess' />
        </p>
      </Col>
      <Col xs={12} lg={6}>
        <h4>
          <Message name='participants.paymentHeading' />
        </h4>
        <p>
          <Message name='participants.paymentProcess' />
        </p>
        <Alert color='warning'>
          <p>
            <Message name='participants.workshopRegistrationNecessary' />
          </p>
          <p>
            <Link to='contact'>
              <Message name='participants.contact' />
            </Link>
          </p>
        </Alert>
      </Col>
      <Col xs={12} lg={6}>
        <h4>
          <Message name='participants.lunchRegistrationHeading' />
        </h4>
        <p>
          <Message name='participants.lunchRegistrationProcess' />
        </p>
      </Col>
    </Row>
  </div>
)

export default SignupHowto
