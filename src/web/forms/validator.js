import { validate } from 'revalidator';

export default schema => (values) => {
  const status = validate(values, schema);
  return {
    ...status,
    errors: status.errors.reduce((errorStatus, field) => ({
      ...errorStatus,
      [field.property]: field.message,
    }), {}),
  };
};
