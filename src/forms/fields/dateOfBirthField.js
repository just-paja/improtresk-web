import moment from 'moment-timezone';

import dateField, { format } from './dateField';

const dateOfBirthField = ({
  minAge = 0,
  messages,
  ...other
} = {}) => dateField({
  conform: (value) => {
    if (!value) {
      return true;
    }
    const momentValue = moment(value, format);
    return momentValue.isValid() ?
      moment().diff(momentValue, 'days') >= minAge * 365 :
      false;
  },
  messages: {
    conform: 'forms.notOldEnough',
    ...messages,
  },
  ...other,
});

export default dateOfBirthField;
