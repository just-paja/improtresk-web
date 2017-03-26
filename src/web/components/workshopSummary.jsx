import Button from 'react-bootstrap/lib/Button';
import React, { PropTypes } from 'react';

import Capacity from './capacity';
import PermaLink from './permaLink';
import Prop from './prop';

const WorkshopSummary = ({ id, capacityStatus, desc, difficulty, name, lectors }) => (
  <div>
    <h2>
      <PermaLink id={id} title={name} to="workshops:item">{name}</PermaLink>
    </h2>

    <ul className="list-unstyled">
      {lectors.map(lectorPosition => (
        <Prop icon="user" label={lectorPosition.role}>{lectorPosition.lector.name}</Prop>
      ))}
      <Prop icon="hand-rock-o" label="Náročnost">{difficulty}</Prop>
      <Prop icon="balance-scale" label="Kapacita">
        {capacityStatus ? (
          <Capacity
            freeSpots={capacityStatus.freeSpots}
            fullyAssigned={capacityStatus.fullyAssigned}
            fullyReserved={capacityStatus.fullyReserved}
            reserved={capacityStatus.reserved}
          />
        ) : null}
      </Prop>
    </ul>
    <div>
      {desc.substr(0, 255)}...
    </div>
    <PermaLink id={id} title={name} to="workshops:item">
      <Button bsSize="small">Více informací</Button>
    </PermaLink>
  </div>
);

WorkshopSummary.propTypes = {
  id: PropTypes.number.isRequired,
  capacityStatus: PropTypes.shape({
    freeSpots: PropTypes.number,
    fullyAssigned: PropTypes.bool,
    fullyReserved: PropTypes.bool,
    reserved: PropTypes.number,
  }),
  desc: PropTypes.string.isRequired,
  difficulty: PropTypes.string,
  name: PropTypes.string.isRequired,
  lectors: PropTypes.arrayOf(PropTypes.shape({
    lector: PropTypes.shape({
      name: PropTypes.name,
    }),
    role: PropTypes.string,
  })).isRequired,
};

WorkshopSummary.defaultProps = {
  capacityStatus: null,
  difficulty: null,
};

export default WorkshopSummary;
