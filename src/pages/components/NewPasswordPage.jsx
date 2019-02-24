import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import Col from 'reactstrap/lib/Col'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from 'reactstrap/lib/Row'

import { getUrlParams } from 'query-string-manipulator'

import Container from '../../components/Container'
import HelmetTitle from '../../containers/HelmetTitle'
import Message from '../../containers/Message'
import NewPasswordForm from '../../participants/containers/NewPasswordForm'

export default class NewPasswordPage extends Component {
  componentWillMount () {
    if (this.props.location && this.props.location.search) {
      const token = getUrlParams(this.props.location.search).find(param => param.key === 'token')
      if (token) {
        this.props.onMount(token.value)
      }
    }
  }

  render () {
    const { translate } = this.props
    return (
      <Container>
        <HelmetTitle title={translate('participants.newPassword')} />
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h1><Message name='participants.newPassword' /></h1>
            <Card>
              <CardBody>
                <p><Message name='participants.newPasswordHelp' /></p>
                <NewPasswordForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

NewPasswordPage.propTypes = {
  location: PropTypes.object.isRequired,
  onMount: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
