import classnames from 'classnames';
import Col from 'reactstrap/lib/Col';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import React from 'react';
import PropTypes from 'prop-types';

import AccomodationPickerItem from './AccomodationPickerItem';
import FormErrors from '../../forms/containers/FormErrors';

import { Accomodation } from '../../proptypes';

const AccomodationPicker = ({
  accomodation,
  input,
  meta,
}) => (
  <Col xs={12}>
    <div
      className={classnames({
        'is-invalid': meta.touched && meta.error,
      })}
    >
      {accomodation.map(house => (
        <AccomodationPickerItem
          capacityStatus={house.capacityStatus}
          disabled={meta.submitting}
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
    </div>
    {meta.touched && meta.error ? (
      <FormFeedback className="d-block">
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
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default AccomodationPicker;
