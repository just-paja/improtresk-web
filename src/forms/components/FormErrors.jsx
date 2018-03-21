import Alert from 'reactstrap/lib/Alert';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import Message from '../../containers/Message';

const FormErrors = ({ data, errors, label, rawLabel, translate }) => {
  const errorList = typeof errors === 'string' ? [errors] : errors;
  return errorList && errorList.length > 0 ? (
    <div>
      {errorList.map((error) => {
        const translatedLabel = typeof label === 'string' && !rawLabel ? translate(label) : null;
        let translation;
        let message;
        try {
          translation = translate(error, {
            ...data,
            label: translatedLabel,
          });
        } catch (e) {
          translation = null;
        }
        if (translation) {
          message = (
            <span>{translation}</span>
          );
        } else {
          message = (
            <Message name="forms.unknownError" />
          );
        }
        return (
          <Alert key={error} color="danger">
            <FontAwesome name="exclamation-triangle" />
            {' '}
            <span>{message}</span>
          </Alert>
        );
      })}
    </div>
  ) : null;
};

FormErrors.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  errors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  label: PropTypes.node,
  rawLabel: PropTypes.bool,
  translate: PropTypes.func.isRequired,
};

FormErrors.defaultProps = {
  data: null,
  errors: null,
  label: null,
  rawLabel: false,
};

export default FormErrors;
