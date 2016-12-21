import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

import PermaLink from './permaLink';

const WorkshopDetail = ({ id, desc, difficulty, name, lector }) => (
  <div>
    <h1>
      <PermaLink id={id} title={name} to="workshops:item">{name}</PermaLink>
    </h1>

    <ul className="list-unstyled">
      <li>
        <FontAwesome name="user" /> {lector.name}
      </li>
      <li>
        <FontAwesome name="hand-rock-o" /> {difficulty}
      </li>
    </ul>
    <div>
      {desc}
    </div>

    <h2>{lector.name}</h2>
    <div>
      {lector.about}
    </div>
  </div>
);

WorkshopDetail.propTypes = {
  id: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lector: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
  }).isRequired,
};

export default WorkshopDetail;
