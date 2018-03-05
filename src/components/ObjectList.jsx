import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import PropTypes from 'prop-types';
import React from 'react';

const ObjectList = ({ colProps, Component, data, emptyMessage, extra, md, xs }) => (
  data.length === 0 && emptyMessage ?
    (<div>{emptyMessage}</div>) : (
      <Row>
        {data.map(object => (
          <Col key={object.id} xs={xs} md={md} {...colProps}>
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
  xs: PropTypes.number,
  extra: PropTypes.object,
};

ObjectList.defaultProps = {
  colProps: {},
  emptyMessage: null,
  extra: {},
  xs: 12,
  md: 6,
};

export default ObjectList;
