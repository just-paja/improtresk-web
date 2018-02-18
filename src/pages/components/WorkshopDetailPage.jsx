import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import WorkshopDetail from '../../workshops/components/WorkshopDetail';

const WorkshopDetailPage = ({ workshop }) => (workshop ? (
  <Container>
    <Helmet
      title={workshop.name}
      meta={[
        {
          property: 'og:title',
          content: workshop.name,
        },
        {
          property: 'og:description',
          content: `${workshop.desc.substr(0, 127)}...`,
        },
      ]}
    />
    <WorkshopDetail {...workshop} />
  </Container>
) : null);

WorkshopDetailPage.propTypes = {
  workshop: PropTypes.object,
};

WorkshopDetailPage.defaultProps = {
  workshop: null,
};

export default WorkshopDetailPage;
