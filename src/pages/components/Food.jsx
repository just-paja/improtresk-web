import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import FoodMenu from '../../food/components/FoodMenu';
import Message from '../../containers/Message';

const Food = ({ meals, intro, translate }) => (
  <Container>
    <Helmet
      title={translate('pages.food')}
      meta={[
        { property: 'og:title', content: translate('pages.food') },
      ]}
    />
    <h1><Message name="pages.food" /></h1>
    <Markdown source={intro} />
    <h2>Jídelníček</h2>
    {meals.map(meal => (
      <FoodMenu
        date={meal.date}
        food={meal.food}
        id={meal.id}
        key={meal.id}
        name={meal.name}
        soups={meal.soups}
      />
    ))}
  </Container>
);

Food.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    food: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
  intro: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

Food.defaultProps = {
  intro: null,
};

export default Food;
