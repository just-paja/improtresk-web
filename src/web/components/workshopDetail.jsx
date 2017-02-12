import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Gallery from './gallery';
import LectorSummary from './lectorSummary';
import PermaLink from './permaLink';

const WorkshopDetail = ({ id, desc, difficulty, name, lectors, photos }) => (
  <div>
    <h1>
      <PermaLink id={id} title={name} to="workshops:item">{name}</PermaLink>
    </h1>

    <ul className="list-unstyled">
      {difficulty ?
        <li>
          <FontAwesome name="hand-rock-o" /> {difficulty}
        </li> : null
      }
    </ul>
    <div>
      <Markdown source={desc} />
    </div>
    <Gallery photos={photos} />
    <Row>
      {lectors.map(lectorPosition => (
        <Col key={lectorPosition.id} md={6}>
          <LectorSummary
            name={lectorPosition.lector.name}
            about={lectorPosition.lector.about}
            photos={lectorPosition.lector.photos}
            position={lectorPosition.role}
          />
        </Col>
      ))}
    </Row>
  </div>
);

WorkshopDetail.propTypes = {
  id: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  lectors: PropTypes.arrayOf(PropTypes.shape({
    lector: PropTypes.shape({
      name: PropTypes.string,
      about: PropTypes.string,
      photos: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
    role: PropTypes.string,
  })).isRequired,
};

export default WorkshopDetail;
