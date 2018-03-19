import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import WorkshopList from '../../workshops/containers/WorkshopList';

const Workshops = ({ translate }) => (
  <Container>
    <HelmetTitle title={translate('pages.workshops')} />
    <h1 className="decent">{translate('pages.workshops')}</h1>
    <WorkshopList />
  </Container>
);

Workshops.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Workshops;
