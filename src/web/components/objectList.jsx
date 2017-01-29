import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import React, { PropTypes } from 'react';

const ObjectList = ({ Component, data, emptyMessage, md }) => (
  data.length === 0 && emptyMessage ?
    (<div>{emptyMessage}</div>) : (
      <Row>
        {data.map(object => (
          <Col key={object.id} md={md}>
            <Component {...object} />
          </Col>
        ))}
      </Row>
    )
);

ObjectList.propTypes = {
  Component: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string,
  md: PropTypes.number,
};

ObjectList.defaultProps = {
  emptyMessage: null,
  md: 6,
};

export default ObjectList;
