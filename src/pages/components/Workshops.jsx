import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import WorkshopList from '../../workshops/components/WorkshopList';

const Workshops = ({ translate, workshops }) => (
  <Container>
    <Helmet
      title={translate('pages.workshops')}
      meta={[
        { property: 'og:title', content: translate('pages.workshops') },
      ]}
    />
    <h1 className="decent">{translate('pages.workshops')}</h1>
    <WorkshopList workshops={workshops} />
  </Container>
);

Workshops.propTypes = {
  translate: PropTypes.func.isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Workshops.defaultProps = {
};

export default Workshops;
