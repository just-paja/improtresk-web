import validator from './validator';

const schema = {
  properties: {
    workshop: {
      maxLength: 255,
      message: 'Vyber si jeden workshop',
      required: true,
      type: 'number',
    },
  },
};

export default validator(schema);
