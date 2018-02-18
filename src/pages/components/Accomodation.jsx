import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';
import PropTypes from 'prop-types';

import AccomodationDetails from '../../accomodation/components/AccomodationDetails';
import Container from '../../components/Container';
import ObjectList from '../../components/ObjectList';
import Message from '../../containers/Message';

const Accomodation = ({ accomodationList, intro, translate }) => (
  <Container>
    <Helmet
      title={translate('pages.accomodation')}
      meta={[
        { property: 'og:title', content: translate('pages.accomodation') },
      ]}
    />
    <h1><Message name="pages.accomodation" /></h1>
    <Markdown source={intro} />
    <ObjectList
      Component={AccomodationDetails}
      data={accomodationList}
    />
  </Container>
);

Accomodation.propTypes = {
  accomodationList: PropTypes.arrayOf(PropTypes.object),
  intro: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

Accomodation.defaultProps = {
  accomodationList: null,
  intro: null,
};

export default Accomodation;
