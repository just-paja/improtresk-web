import PropTypes from 'prop-types';

import { ResourceId } from 'react-saga-rest/lib/proptypes';

export const CapacityStatus = PropTypes.shape({
  assigned: PropTypes.number,
  capacity: PropTypes.number,
  freeSpots: PropTypes.number,
  fullyAssigned: PropTypes.bool,
  fullyReserved: PropTypes.bool,
  reserved: PropTypes.number,
});

export const Children = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);

export const ClassName = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.objectOf(PropTypes.string),
]);

export const FormError = PropTypes.oneOfType([
  PropTypes.shape({
    property: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    invalidValue: PropTypes.string,
  }),
  PropTypes.string,
]);

export const FormData = PropTypes.shape({
  changedFields: PropTypes.arrayOf(PropTypes.string),
  fieldErrors: PropTypes.objectOf(
    FormError,
    PropTypes.arrayOf(FormError)
  ).isRequired,
  changed: PropTypes.bool,
  loading: PropTypes.bool,
  valid: PropTypes.bool,
  submitError: FormError,
  values: PropTypes.object,
});

export const Accomodation = PropTypes.shape({
  id: ResourceId.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
});

export const Lector = PropTypes.shape({
  id: ResourceId.isRequired,
  name: PropTypes.string.isRequired,
});

export const LectorInRole = PropTypes.shape({
  id: ResourceId.isRequired,
  lector: Lector.isRequired,
  role: PropTypes.string.isRequired,
});

export const MultiLingualText = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  text: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
});

export const MultiLingualDescription = PropTypes.arrayOf(MultiLingualText);

export const Meal = PropTypes.shape({
  date: PropTypes.string.isRequired,
  id: ResourceId.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
});

export const Option = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const Options = PropTypes.arrayOf(Option);

export const Photo = PropTypes.shape({
  caption: PropTypes.string,
  src: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
});

export const NewsItem = PropTypes.shape({
  id: ResourceId,
  name: PropTypes.string,
  text: PropTypes.string,
});

export const Order = PropTypes.shape({
  accomodation: Accomodation,
  assigned: PropTypes.bool,
  canceled: PropTypes.bool,
  confirmed: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  id: ResourceId.isRequired,
  meals: PropTypes.arrayOf(Meal).isRequired,
  overPaid: PropTypes.bool,
  paid: PropTypes.bool,
  price: PropTypes.number.isRequired,
  symvar: PropTypes.string.isRequired,
});

export const Participant = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});


export const PollAnswer = PropTypes.shape({
  answerCount: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  performer: PropTypes.object,
  text: PropTypes.string.isRequired,
});

export const Workshop = PropTypes.shape({
  capacityStatus: CapacityStatus.isRequired,
  id: ResourceId.isRequired,
  lectors: PropTypes.arrayOf(LectorInRole).isRequired,
  name: PropTypes.string.isRequired,
});
