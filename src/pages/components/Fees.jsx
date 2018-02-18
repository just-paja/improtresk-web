import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import Message from '../../containers/Message';

const Fees = ({
  howToPay,
  howToSignOut,
  translate,
  whatDoYouPayFor,
}) => (
  <Container>
    <Helmet
      title={translate('pages.fees')}
      meta={[
        { property: 'og:title', content: translate('pages.fees') },
      ]}
    />
    <h1><Message name="pages.fees" /></h1>
    <h2>Za co se platí?</h2>
    <Markdown source={whatDoYouPayFor} />

    <h2>Jak zaplatím?</h2>
    <Markdown source={howToPay} />

    <h2>Jak se můžu odhlásit?</h2>
    <Markdown source={howToSignOut} />
  </Container>
);

Fees.propTypes = {
  translate: PropTypes.func.isRequired,
  whatDoYouPayFor: PropTypes.string.isRequired,
  howToPay: PropTypes.string.isRequired,
  howToSignOut: PropTypes.string.isRequired,
};

export default Fees;
