import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import PerformerDetail from '../../performers/containers/PerformerDetail';

const PerformerDetailPage = ({ match }) => (
  <Container>
    <PerformerDetail resourceId={match.params.slug} />
  </Container>
);

PerformerDetailPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PerformerDetailPage;
