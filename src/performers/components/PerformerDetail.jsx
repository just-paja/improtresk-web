import Col from 'reactstrap/lib/Col';
import React from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import Gallery from '../../components/Gallery';
import LinkServiceList from '../../components/LinkServiceList';
import MultiLingualMarkdown from '../../containers/MultiLingualMarkdown';

const PerformerDetail = ({ performer }) => (
  <div>
    <h1>{performer.name}</h1>
    <Row>
      <Col md={8}>
        <MultiLingualMarkdown texts={performer.descriptions} />
      </Col>
      <Col md={4}>
        {performer.links.length ? (
          <LinkServiceList links={performer.links} />
        ) : null}
      </Col>
    </Row>
    <Gallery photos={performer.photos} />
  </div>
);

PerformerDetail.propTypes = {
  performer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default PerformerDetail;
