import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import TextFood from '../../texts/containers/TextFood';
import MealList from '../../food/containers/MealList';
import Message from '../../containers/Message';

const Food = ({ translate }) => (
  <Container>
    <Helmet
      title={translate('pages.food')}
      meta={[
        { property: 'og:title', content: translate('pages.food') },
      ]}
    />
    <h1><Message name="pages.food" /></h1>
    <TextFood />
    <h2><Message name="pages.festivalMenu" /></h2>
    <MealList />
  </Container>
);

Food.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Food;
