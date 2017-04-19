import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';

import Button from '../button';
import Link from '../link';
import FormErrors from '../formErrors';
import FoodPicker from '../inputs/foodPicker';

export default class ChangeFood extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(input, value) {
    this.props.onChange(this.props.form, input, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.form);
  }

  render() {
    const {
      errors,
      loading,
      meals,
      submitErrors,
      submitted,
      values,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Well>
          <FoodPicker
            disabled={loading}
            name="workshop"
            onChange={this.handleChange}
            error={errors.workshop}
            meals={meals}
            touched={submitted}
            value={values}
          />
        </Well>
        <FormErrors errors={submitErrors} />
        <Link to="participant:home">
          <Button icon="ban">Zrušit změnu</Button>
        </Link>
        <Button
          bsStyle="primary"
          className="pull-right"
          loading={loading}
          type="submit"
        >Vybrat jídlo</Button>
      </Form>
    );
  }
}

ChangeFood.propTypes = {
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitErrors: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
  values: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

ChangeFood.defaultProps = {
  loading: false,
  newPassword: false,
  submitErrors: null,
  submitted: false,
};
