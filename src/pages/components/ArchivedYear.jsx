import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import ArchivedYearDetail from '../../years/containers/ArchivedYearDetail';

const ArchivedYear = ({ match }) => (
  <Container>
    <ArchivedYearDetail resourceId={match.params.slug} />
  </Container>
);

ArchivedYear.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ArchivedYear;
