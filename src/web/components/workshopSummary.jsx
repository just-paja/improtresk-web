import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

import { Button } from 'react-bootstrap';

import PermaLink from './permaLink';

const WorkshopSummary = ({ id, desc, difficulty, name, lector }) => (
  <div>
    <h2>
      <PermaLink id={id} title={name} to="workshops:item">{name}</PermaLink>
    </h2>

    <ul className="list-unstyled">
      <li>
        <FontAwesome name="user" /> {lector.name}
      </li>
      <li>
        <FontAwesome name="hand-rock-o" /> {difficulty}
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
  difficulty: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lector: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default WorkshopSummary;
