import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import React, { Component } from 'react'

import Button from '../components/Button'
import Message from '../containers/Message'
import LoginForm from '../participants/containers/LoginForm'
import SignupForm from '../participants/containers/SignupForm'

export default class UserEntry extends Component {
  constructor () {
    super()
    this.handleToggleForm = this.handleToggleForm.bind(this)
    this.state = {}
  }

  handleToggleForm () {
    this.setState({ showRegistration: !this.state.showRegistration })
  }

  render () {
    if (!this.state.showRegistration) {
      return (
        <Card>
          <CardBody>
            <p>
              <Message name='participants.mightHaveAccountHelp' />
            </p>
            <LoginForm />
            <hr />
            <p>
              <Message name='participants.newUserHelp' />
            </p>
            <Button
              color='primary'
              icon='wpforms'
              onClick={this.handleToggleForm}
              size='lg'
            >
              <Message name='participants.registration' />
            </Button>
          </CardBody>
        </Card>
      )
    }
    return (
      <Card>
        <CardBody>
          <h2><Message name='participants.registration' /></h2>
          <SignupForm />
          <hr />
          <p>
            <Message name='participants.haveAccount' />
          </p>
          <Button
            color='secondary'
            icon='sign-in'
            onClick={this.handleToggleForm}
            size='lg'
          >
            <Message name='participants.login' />
          </Button>
        </CardBody>
      </Card>
    )
  }
}
