import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import Col from 'reactstrap/lib/Col'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Row from 'reactstrap/lib/Row'

import Container from '../../components/Container'
import HelmetTitle from '../../containers/HelmetTitle'
import Message from '../../containers/Message'
import IconMessage from '../../components/IconMessage'

export default class Contact extends Component {
  componentWillMount () {
    this.props.onMount()
  }

  render () {
    const { translate } = this.props
    const title = translate('pages.contact')

    return (
      <Container>
        <HelmetTitle title={title} />
        <h1 className='text-center'>{title}</h1>
        <Row>
          <Col md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
            <Card>
              <CardBody>
                <p>
                  <Message name='pages.festivalOrg' />
                </p>
                <ul className='list-unstyled'>
                  <li>
                    <IconMessage fixedWidth icon='globe' name='generic.website' />:{' '}
                    <a href='https://improtresk.cz'>improtresk.cz</a>
                  </li>
                  <li>
                    <IconMessage fixedWidth icon='envelope-o' name='generic.email' />:{' '}
                    <a href='mailto:info@improtresk.cz'>info@improtresk.cz</a>
                  </li>
                  <li>
                    <IconMessage fixedWidth icon='phone' name='generic.contactPhone' />:{' '}
                    Jakub Krejčí{' '}
                    <a href='tel:+420 721 434 532'>+420 721 434 532</a>
                  </li>
                  <li>
                    <IconMessage fixedWidth icon='facebook-official' name='generic.facebook' />:{' '}
                    <a href='https://fb.com/improligacz'>improligacz</a>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

Contact.propTypes = {
  onMount: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
