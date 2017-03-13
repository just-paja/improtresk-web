import Button from 'react-bootstrap/lib/Button';
import React, { PropTypes } from 'react';


import LectorListSummary from './lectorListSummary';
import PermaLink from './permaLink';
import Prop from './prop';

const WorkshopSummary = ({ id, desc, difficulty, name, lectors }) => (
  <div>
    <h2>
      <PermaLink id={id} title={name} to="workshops:item">{name}</PermaLink>
    </h2>

    <ul className="list-unstyled">
      {lectors.map(lectorPosition => (
        <LectorListSummary
          key={lectorPosition.id}
          position={lectorPosition.role}
          name={lectorPosition.lector.name}
        />
      ))}
      <Prop icon="hand-rock-o" label="Náročnost">{difficulty}</Prop>
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
  difficulty: null,
};

export default WorkshopSummary;
