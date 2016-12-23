import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import React, { PropTypes } from 'react';

import WorkshopSummary from './workshopSummary';

const WorkshopList = ({ workshops }) => (
  <Row>
    {workshops.map(workshop => (
      <Col key={workshop.id} md={6}>
        <WorkshopSummary {...workshop} />
      </Col>
    ))}
  </Row>
);

WorkshopList.propTypes = {
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WorkshopList;
