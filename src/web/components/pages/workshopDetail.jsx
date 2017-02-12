import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import NotFound from '../notFound';
import WorkshopDetail from '../workshopDetail';

import { idFromSlug } from '../../routes';

export default class WorkshopDetailPage extends Component {
  componentWillMount() {
    this.props.onMount(idFromSlug(this.props.routeParams.slug));
  }

  render() {
    const { ready, workshop } = this.props;

    if (!ready) {
      return null;
    }

    if (!workshop) {
      return <NotFound />;
    }

    return (
      <Container>
        <Helmet
          title={workshop.name}
          meta={[
            {
              property: 'og:title',
              content: workshop.name,
            },
            {
              property: 'og:description',
              content: `${workshop.desc.substr(0, 127)}...`,
            },
          ]}
        />
        <WorkshopDetail {...workshop} />
      </Container>
    );
  }
}

WorkshopDetailPage.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  routeParams: PropTypes.object.isRequired,
  workshop: PropTypes.object,
};

WorkshopDetailPage.defaultProps = {
  ready: false,
  workshop: false,
};
