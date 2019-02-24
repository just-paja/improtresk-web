import { validate } from 'revalidator'

export default schema => values =>
  validate(values, schema).errors.reduce((errorStatus, field) => ({
    ...errorStatus,
    [field.property]: field.message
  }), {})
