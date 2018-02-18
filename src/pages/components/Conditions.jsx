import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import Link from '../../containers/Link';
import Message from '../../containers/Message';

const Conditions = ({ conditions, translate }) => (
  <Container>
    <Helmet
      title={translate('pages.conditions')}
      meta={[
        { property: 'og:title', content: translate('pages.conditions') },
      ]}
    />
    <h1><Message name="pages.conditions" /></h1>
    {(conditions ?
      <Markdown source={conditions.text} /> :
      <p>
        Podmínky pro účastníky za tento ročník ještě nejsou zveřejněné. Organizátoři
        by to měli co nejrychleji napravit, zkuste je{' '}
        <Link to="contact">popohnat</Link>.
      </p>
    )}
  </Container>
);

Conditions.propTypes = {
  conditions: PropTypes.object,
  translate: PropTypes.func.isRequired,
};

Conditions.defaultProps = {
  conditions: null,
};

export default Conditions;
