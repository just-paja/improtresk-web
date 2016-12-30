import React, { Component, PropTypes } from 'react';

import Container from '../container';
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

    return (
      <Container>
        <WorkshopDetail {...workshop} />
      </Container>
    );
  }
}

WorkshopDetailPage.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  routeParams: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  workshop: PropTypes.object.isRequired,
};

WorkshopDetailPage.defaultProps = {
  ready: false,
};
