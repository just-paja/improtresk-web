import Button from 'react-bootstrap/lib/Button';
import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';


import PermaLink from './permaLink';

const WorkshopSummary = ({ id, desc, difficulty, name, lectors }) => (
  <div>
    <h2>
      <PermaLink id={id} title={name} to="workshops:item">{name}</PermaLink>
    </h2>

    <ul className="list-unstyled">
      {lectors.map(lectorRole => (
        <li key={lectorRole.id}>
          <FontAwesome name="user" />
          {' '}
          <b>{lectorRole.role}:</b>
          {' '}
          {lectorRole.lector}
        </li>
      ))}
      <li>
        <FontAwesome name="hand-rock-o" />
        {' '}
        {difficulty.name}
      </li>
    </ul>
    <div>
      {desc.substr(0, 255)}...
    </div>
    <PermaLink id={id} title={name} to="workshops:item">
      <Button>Více informací</Button>
    </PermaLink>
  </div>
);

WorkshopSummary.propTypes = {
  id: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  difficulty: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  lectors: PropTypes.arrayOf(PropTypes.shape({
    lector: PropTypes.string,
  })).isRequired,
};

export default WorkshopSummary;
