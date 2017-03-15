import React, { PropTypes } from 'react';

import HumanDate from '../humanDate';
import Meal from '../meal';
import Prop from '../prop';
import Status from './status';

const Header = ({
  assigned,
  confirmed,
  canceled,
  endsAt,
  meals,
  paid,
  workshop,
  year,
}) => (
  <ul className="list-unstyled">
    <Prop label="Stav">
      <Status
        assigned={assigned}
        confirmed={confirmed}
        canceled={canceled}
        paid={paid}
        endsAt={endsAt}
      />
    </Prop>
    <Prop label="Workshop">{workshop ? workshop.name : null}</Prop>
    <Prop label="Datum">
      {year ? <HumanDate date={year.startDate} /> : null}
    </Prop>
    <Prop label="Jídlo">
      {meals.length ? (
        meals.map(meal => <Meal key={meal.id} name={meal.name} date={meal.date} />)
      ) : null}
    </Prop>
  </ul>
);

Header.propTypes = {
  assigned: PropTypes.bool,
  canceled: PropTypes.bool,
  paid: PropTypes.bool,
  confirmed: PropTypes.bool,
  endsAt: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  workshop: PropTypes.shape({
    name: PropTypes.string,
    lectors: PropTypes.arrayOf(PropTypes.shape({
      lector: PropTypes.shape({
        name: PropTypes.string,
        about: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.object).isRequired,
      }),
      role: PropTypes.string,
    })).isRequired,
  }),
  year: PropTypes.object,
};

Header.defaultProps = {
  assigned: false,
  canceled: false,
  confirmed: false,
  endsAt: null,
  paid: false,
  workshop: null,
  year: null,
};

export default Header;
