import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import AccomodationList from '../../accomodation/containers/AccomodationList';
import Container from '../../components/Container';
import Message from '../../containers/Message';
import TextAccomodation from '../../texts/containers/TextAccomodation';

const Accomodation = ({ translate }) => (
  <Container>
    <Helmet
      title={translate('pages.accomodation')}
      meta={[
        { property: 'og:title', content: translate('pages.accomodation') },
      ]}
    />
    <h1><Message name="pages.accomodation" /></h1>
    <TextAccomodation skipFirstHeading />
    <AccomodationList />
  </Container>
);

Accomodation.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Accomodation;
