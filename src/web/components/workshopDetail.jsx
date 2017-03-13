import Col from 'react-bootstrap/lib/Col';
import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Gallery from './gallery';
import LectorSummary from './lectorSummary';
import PermaLink from './permaLink';
import PriceList from './priceList';
import Prop from './prop';

const WorkshopDetail = ({ id, desc, difficulty, name, lectors, photos, prices }) => (
  <div>
    <h1>
      <PermaLink id={id} title={name} to="workshops:item">{name}</PermaLink>
    </h1>

    <ul className="list-unstyled">
      <Prop icon="hand-rock-o" label="Náročnost">{difficulty}</Prop>
      <Prop icon="money" label="Cena">
        {prices.length ? <PriceList prices={prices} /> : null}
      </Prop>
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
    id: PropTypes.number,
    endsOn: PropTypes.string,
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
