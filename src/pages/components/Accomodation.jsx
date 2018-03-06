import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import AccomodationDetails from '../../accomodation/components/AccomodationDetails';
import Container from '../../components/Container';
import ObjectList from '../../components/ObjectList';
import Message from '../../containers/Message';
import TextAccomodation from '../../texts/containers/TextAccomodation';

const Accomodation = ({ accomodationList, translate }) => (
  <Container>
    <Helmet
      title={translate('pages.accomodation')}
      meta={[
        { property: 'og:title', content: translate('pages.accomodation') },
      ]}
    />
    <h1><Message name="pages.accomodation" /></h1>
    <TextAccomodation skipFirstHeading />
    <ObjectList
      Component={AccomodationDetails}
      data={accomodationList}
    />
  </Container>
);

Accomodation.propTypes = {
  accomodationList: PropTypes.arrayOf(PropTypes.object),
  translate: PropTypes.func.isRequired,
};

Accomodation.defaultProps = {
  accomodationList: null,
};

export default Accomodation;
