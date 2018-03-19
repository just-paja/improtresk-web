import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import Message from '../../containers/Message';
import RulesContainer from '../../years/containers/Rules';

const Rules = ({ translate }) => (
  <Container>
    <HelmetTitle title={translate('pages.conditions')} />
    <h1><Message name="pages.conditions" /></h1>
    <RulesContainer />
  </Container>
);

Rules.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Rules;
