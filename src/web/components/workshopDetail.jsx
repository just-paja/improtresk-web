import FontAwesome from 'react-fontawesome';
import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';

import Gallery from './gallery';
import PermaLink from './permaLink';

const WorkshopDetail = ({ id, desc, difficulty, name, lector, photos }) => (
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
      <Markdown source={desc} />
    </div>
    <Gallery photos={photos} />

    <h2>{lector.name}</h2>
    <div>
      <Markdown source={lector.about} />
    </div>
    <Gallery photos={lector.photos} />
  </div>
);

WorkshopDetail.propTypes = {
  id: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  lector: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default WorkshopDetail;
