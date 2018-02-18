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

export const Accomodation = PropTypes.shape({
  id: ResourceId.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
});

export const Lector = PropTypes.shape({
  id: ResourceId.isRequired,
  name: PropTypes.string.isRequired,
});

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

export const PollAnswer = PropTypes.shape({
  answerCount: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  performer: PropTypes.object,
  text: PropTypes.string.isRequired,
});

export const Workshop = PropTypes.shape({
  capacityStatus: CapacityStatus.isRequired,
  id: ResourceId.isRequired,
  lectors: PropTypes.arrayOf(Lector).isRequired,
  name: PropTypes.string.isRequired,
});
