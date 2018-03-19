import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import MealList from '../../food/containers/MealList';
import Message from '../../containers/Message';
import TextFood from '../../texts/containers/TextFood';

const Food = ({ translate }) => (
  <Container>
    <HelmetTitle title={translate('pages.food')} />
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
