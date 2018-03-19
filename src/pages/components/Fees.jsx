import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import Message from '../../containers/Message';
import TextFees from '../../texts/containers/TextFees';

const Fees = ({
  translate,
}) => (
  <Container>
    <HelmetTitle title={translate('pages.fees')} />
    <h1><Message name="pages.fees" /></h1>
    <TextFees skipFirstHeading emptyMessage="pages.feesEmpty" />
  </Container>
);

Fees.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Fees;
