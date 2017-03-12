import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Gallery from './gallery';
import HumanDate from './humanDate';
import LectorSummary from './lectorSummary';
import PermaLink from './permaLink';
import Price from './price';

const WorkshopDetail = ({ id, desc, difficulty, name, lectors, photos, prices }) => (
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
      {prices.length ?
        <li>
          <FontAwesome name="money" /> Cena:
          <ul>
            {prices.map(price => (
              <li key={price.name}>
                od{' '}
                <HumanDate date={price.takesEffectOn} />
                {price.endsOn ? (
                  <span>
                    {' - '}
                    <HumanDate date={price.endsOn} />
                  </span>
                ) : null}
                {': '}
                <Price price={price.price} />
              </li>
            ))}
          </ul>
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
  prices: PropTypes.arrayOf(PropTypes.shape({
    endsOn: PropTypes.number,
    price: PropTypes.number.isRequired,
    takesEffectOn: PropTypes.string.isRequired,
  })).isRequired,
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
