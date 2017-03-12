import Alert from 'react-bootstrap/lib/Alert';
import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

const messages = {
  unauthorized: 'Neplatná kombinace uživatelského jména nebo hesla',
  'api-error': 'Chyba komunikace s API',
};

const FormErrors = ({ errors }) => (
  errors ? (
    <div>
      {errors.map(error => (
        <Alert key={error} bsStyle="danger">
          <FontAwesome name="exclamation-triangle" /> {
            messages[error] || `Neznámá chyba: ${error}`
          }
        </Alert>
      ))}
    </div>
  ) : null
);

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

FormErrors.defaultProps = {
  errors: null,
};

export default FormErrors;
