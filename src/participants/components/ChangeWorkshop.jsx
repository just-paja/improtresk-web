import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import Link from '../../containers/Link';
import FormErrors from '../../forms/containers/FormErrors';
import WorkshopPicker from '../../orders/components/WorkshopPicker';

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
        <Link to="participantHome">
          <Button icon="ban">Zrušit změnu</Button>
        </Link>
        <Button
          color="primary"
          className="pull-right"
          loading={loading}
          type="submit"
        >
          Změnit workshop
        </Button>
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
  submitErrors: null,
  submitted: false,
};
