import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import WorkshopDetail from '../../workshops/containers/WorkshopDetail';

const WorkshopDetailPage = ({ match }) => (
  <Container>
    <WorkshopDetail resourceId={match.params.slug} />
  </Container>
);

WorkshopDetailPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default WorkshopDetailPage;
