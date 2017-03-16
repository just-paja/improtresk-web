import validator from './validator';

const schema = {
  properties: {
    accomodation: {
      maxLength: 255,
      message: 'Vyber si ubytování',
      required: true,
      type: 'number',
    },
    workshop: {
      maxLength: 255,
      message: 'Vyber si jeden workshop',
      required: true,
      type: 'number',
    },
  },
};

export default validator(schema);
