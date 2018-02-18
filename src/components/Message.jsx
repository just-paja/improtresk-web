import PropTypes from 'prop-types';
import React from 'react';

import { logWarning } from '../clientLogger';

const Message = ({ name, data, translate, ...params }) => {
  let msg;
  try {
    msg = translate(name, data, params);
  } catch (e) {
    logWarning(`Cannot translate message ${name}`);
    msg = name;
  }
  return (
    <span>{msg}</span>
  );
};

Message.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object,
  translate: PropTypes.func.isRequired,
};

Message.defaultProps = {
  data: undefined,
};

export default Message;
