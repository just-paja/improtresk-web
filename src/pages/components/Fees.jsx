import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import TextFees from '../../texts/containers/TextFees';

const Fees = ({
  translate,
}) => (
  <Container>
    <Helmet
      title={translate('pages.fees')}
      meta={[
        { property: 'og:title', content: translate('pages.fees') },
      ]}
    />
    <h1><Message name="pages.fees" /></h1>
    <TextFees skipFirstHeading emptyMessage="pages.feesEmpty" />
  </Container>
);

Fees.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Fees;
