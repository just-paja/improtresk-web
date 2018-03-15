import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import WorkshopList from '../../workshops/containers/WorkshopList';

const Workshops = ({ translate }) => (
  <Container>
    <Helmet
      title={translate('pages.workshops')}
      meta={[
        { property: 'og:title', content: translate('pages.workshops') },
      ]}
    />
    <h1 className="decent">{translate('pages.workshops')}</h1>
    <WorkshopList />
  </Container>
);

Workshops.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Workshops;
