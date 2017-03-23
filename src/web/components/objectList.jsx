import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import React, { PropTypes } from 'react';

const ObjectList = ({ colProps, Component, data, emptyMessage, extra, md }) => (
  data.length === 0 && emptyMessage ?
    (<div>{emptyMessage}</div>) : (
      <Row>
        {data.map(object => (
          <Col key={object.id} md={md} {...colProps}>
            <Component {...object} {...extra} />
          </Col>
        ))}
      </Row>
    )
);

ObjectList.propTypes = {
  colProps: PropTypes.object,
  Component: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string,
  md: PropTypes.number,
  extra: PropTypes.object,
};

ObjectList.defaultProps = {
  colProps: {},
  emptyMessage: null,
  extra: {},
  md: 6,
};

export default ObjectList;
