/* eslint-disable no-template-curly-in-string */
export default {
  forms: {
    badDateFormat: 'Please input the date in international format ISO-8601.',
    notOldEnough: 'Field ${label} does not meet the age limit.',
    fieldRequired: 'Field ${label} must not be empty',
    unknownError: 'Unknown error',
    notAnEmail: 'Field ${label} does not contain public e-mail address',
    notAHumanName: 'We do not belive that field ${label} contains human name.',
    errors: {
      unauthorized: 'Incorrect combination of email and password',
      'api-error': 'Error communicating with API',
      'invalid-token': 'Invalid token, operation was not authorized',
      'workshop-is-full': 'Workshop is full',
      'unknown-object': 'Unknown object was requested',
      'must-be-owner': 'Only owner of the order can request this change',
      'make-reservation-first': 'Make a reservation before changing workshop',
      'no-matching-price-level': 'There is no price level matching requested change',
      'email-already-exists': 'We already have this e-mail in our database. Are you sure you do not already have an account?',
      'must-be-eighteen': 'You must be eighteen.',
      'must-accept-rules': 'We need you to agree with festival rules.'
    },
    tooLong: 'Value of ${label} is too long.',
    tooShort: 'Value of ${label} is too short.'
  }
}
