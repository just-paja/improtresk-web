import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BsForm from 'reactstrap/lib/Form';

import { Children, FormGeneralError } from '../../proptypes';

import FormErrors from '../containers/FormErrors';
import styles from './Form.css';

export default class Form extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.name);
  }

  render() {
    let errors;
    if (this.props.error) {
      if (this.props.error instanceof Array) {
        errors = this.props.error;
      } else if (this.props.error.messages) {
        errors = this.props.error.messages;
      } else if (this.props.error.errors) {
        // eslint-disable-next-line prefer-destructuring
        errors = this.props.error.errors;
      } else if (typeof this.props.error === 'string') {
        errors = [this.props.error];
      }
    }
    return (
      <div>
        <BsForm className={styles.form} onSubmit={this.handleSubmit} noValidate>
          {this.props.children}
        </BsForm>
        <FormErrors errors={errors} />
      </div>
    );
  }
}

Form.propTypes = {
  children: Children.isRequired,
  error: FormGeneralError,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  error: null,
};
