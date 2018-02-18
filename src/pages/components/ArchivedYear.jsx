import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import ObjectList from '../../components/ObjectList';
import WorkshopSummaryOneLine from '../../workshops/components/WorkshopSummaryOneLine';

const ArchivedYear = ({ topic, workshops, year }) => {
  const title = `Ročník ${year}`;
  const titleFull = `${title}: ${topic}`;

  return (
    <Container>
      <Helmet
        title={titleFull}
        meta={[
          { property: 'og:title', content: titleFull },
        ]}
      />
      <h1>{title}<br /><small>{topic}</small></h1>
      <h2>Workshopy</h2>
      <ObjectList
        Component={WorkshopSummaryOneLine}
        data={workshops}
        emptyMessage="Bohužel nemáme záznamy"
        extra={{ hideCapacity: true }}
      />
    </Container>
  );
};

ArchivedYear.propTypes = {
  topic: PropTypes.string,
  workshops: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    lectorName: PropTypes.string,
    name: PropTypes.string,
  })),
  year: PropTypes.string,
};

ArchivedYear.defaultProps = {
  topic: null,
  workshops: null,
  year: null,
};

export default ArchivedYear;
