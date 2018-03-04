import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Col from 'reactstrap/lib/Col';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import Gallery from '../../components/Gallery';
import Message from '../../containers/Message';
import LectorSummary from './LectorSummary';
import PriceList from '../../years/components/PriceList';
import Prop from '../../components/Prop';

const WorkshopDetail = ({ desc, difficulty, name, lectors, photos, prices }) => (
  <div>
    <h1 className="decent">{name}</h1>
    <Row>
      <Col className="col-wrap" xs="12" lg="6">
        <Card>
          <CardBody>
            <ul className="list-unstyled">
              <Prop icon="hand-rock-o" label={<Message name="workshops.difficulty" />}>
                {difficulty.name}
              </Prop>
              <Prop icon="money" label={<Message name="workshops.price" />}>
                {prices.length ? <PriceList prices={prices} /> : null}
              </Prop>
            </ul>
            <div>
              <Markdown source={desc} />
            </div>
            <Gallery photos={photos} />
          </CardBody>
        </Card>
      </Col>
      <Col xs="12" lg="6">
        {lectors.map(lectorPosition => (
          <LectorSummary
            key={lectorPosition.id}
            name={lectorPosition.lector.name}
            about={lectorPosition.lector.about}
            photos={lectorPosition.lector.photos}
            position={lectorPosition.role}
          />
        ))}
      </Col>
    </Row>
  </div>
);

WorkshopDetail.propTypes = {
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
