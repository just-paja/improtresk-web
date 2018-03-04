import Alert from 'reactstrap/lib/Alert';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import Message from '../../containers/Message';

const FormErrors = ({ errors, translate }) => (
  errors && errors.length > 0 ? (
    <div>
      {errors.map((error) => {
        let translation;
        let message;
        try {
          translation = translate(`forms.errors.${error}`);
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
  ) : null
);

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  translate: PropTypes.func.isRequired,
};

FormErrors.defaultProps = {
  errors: null,
};

export default FormErrors;
