import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import React, { PropTypes } from 'react';

import Tip from './tip';

const TipList = ({ tips }) => (
  <Row>
    {tips.map(tip => (
      <Col key={tip.id} md={6}>
        <Tip {...tip} />
      </Col>
    ))}
  </Row>
);

TipList.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TipList;
