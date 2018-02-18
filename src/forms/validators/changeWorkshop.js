import validator from './validator';

const schema = {
  properties: {
    workshop: {
      message: 'Vyber si jeden workshop',
      required: true,
      type: 'number',
    },
  },
};

export default validator(schema);
