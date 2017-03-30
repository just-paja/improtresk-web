import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';

import Button from '../button';
import Link from '../link';
import FormErrors from '../formErrors';
import WorkshopPicker from '../inputs/workshopPicker';

export default class ChangeWorkshop extends Component {
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
      submitErrors,
      submitted,
      values,
      workshops,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <WorkshopPicker
          disabled={loading}
          name="workshop"
          onChange={this.handleChange}
          error={errors.workshop}
          touched={submitted}
          value={values.workshop}
          workshops={workshops}
        />
        <FormErrors errors={submitErrors} />
        <Link to="participant:home">
          <Button icon="ban">Zrušit změnu</Button>
        </Link>
        <Button
          bsStyle="primary"
          className="pull-right"
          loading={loading}
          type="submit"
        >Změnit workshop</Button>
      </Form>
    );
  }
}

ChangeWorkshop.propTypes = {
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitErrors: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
  values: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ChangeWorkshop.defaultProps = {
  loading: false,
  newPassword: false,
  submitErrors: null,
  submitted: false,
};
