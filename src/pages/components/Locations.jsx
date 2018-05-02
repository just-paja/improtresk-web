import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import LocationList from '../../locations/containers/LocationList';
import MarkerMap from '../../locations/containers/MarkerMap';
import Message from '../../containers/Message';
import TextLocations from '../../texts/containers/TextLocations';

const Locations = ({ translate }) => (
  <Container>
    <HelmetTitle title={translate('pages.locations')} />
    <h1><Message name="pages.locations" /></h1>
    <TextLocations skipFirstHeading />
    <LocationList />
    <hr />
    <MarkerMap />
    <Breadcrumb>
      <BreadcrumbItem>
        <Message name="pages.forParticipants" />
      </BreadcrumbItem>
      <BreadcrumbItem active>
        <Message name="pages.locations" />
      </BreadcrumbItem>
    </Breadcrumb>
  </Container>
);

Locations.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Locations;
