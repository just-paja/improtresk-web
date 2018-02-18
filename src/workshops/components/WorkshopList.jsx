import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import PropTypes from 'prop-types';
import React from 'react';

import Message from '../../containers/Message';
import WorkshopSummary from './WorkshopSummary';

const WorkshopList = ({ workshops }) => (
  workshops.length > 0 ? (
    <Row>
      {workshops.map(workshop => (
        <Col key={workshop.id} md={6}>
          <WorkshopSummary {...workshop} />
        </Col>
      ))}
    </Row>
  ) : (
    <Alert bsStyle="info">
      <Message name="workshops.empty" />
    </Alert>
  )
);

WorkshopList.propTypes = {
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WorkshopList;
