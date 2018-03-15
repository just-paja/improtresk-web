import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import TipList from '../../texts/containers/TipList';

const Tips = ({ translate }) => (
  <Container>
    <Helmet
      title={translate('pages.tips')}
      meta={[
        { property: 'og:title', content: translate('pages.tips') },
      ]}
    />
    <h1><Message name="pages.tips" /></h1>
    <TipList />
  </Container>
);

Tips.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Tips;
