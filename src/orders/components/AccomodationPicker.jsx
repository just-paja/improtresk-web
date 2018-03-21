import Col from 'reactstrap/lib/Col';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import React from 'react';
import PropTypes from 'prop-types';

import AccomodationPickerItem from './AccomodationPickerItem';
import FormErrors from '../../forms/containers/FormErrors';

import { Accomodation } from '../../proptypes';

const AccomodationPicker = ({
  accomodation,
  disabled,
  input,
  meta,
}) => (
  <Col xs={12}>
    {accomodation.map(house => (
      <AccomodationPickerItem
        capacityStatus={house.capacityStatus}
        disabled={disabled}
        selected={input.value === house.id}
        key={house.id}
        id={house.id}
        name={house.name}
        parentName={input.name}
        price={house.price}
        onChange={input.onChange}
        value={house.id}
      />
    ))}
    {meta.touched && meta.error ? (
      <FormFeedback>
        <FormErrors
          errors={meta.error}
          data={{ field: input.name }}
        />
      </FormFeedback>
    ) : null}
  </Col>
);

AccomodationPicker.propTypes = {
  accomodation: PropTypes.arrayOf(Accomodation).isRequired,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

AccomodationPicker.defaultProps = {
  disabled: false,
};

export default AccomodationPicker;
