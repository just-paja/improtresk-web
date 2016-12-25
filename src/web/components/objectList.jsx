import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import React, { PropTypes } from 'react';

const ObjectList = ({ component, data }) => (
  <Row>
    {data.map(object => (
      <Col key={object.id} md={6}>
        <component {...object} />
      </Col>
    ))}
  </Row>
);

ObjectList.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ObjectList;
