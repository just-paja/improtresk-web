import React, { Component, PropTypes } from 'react';

import WorkshopDetail from '../workshopDetail';

import { idFromSlug } from '../../routes';

export default class WorkshopDetailPage extends Component {
  componentDidMount() {
    this.props.onMount(idFromSlug(this.props.routeParams.slug));
  }

  render() {
    const { ready, workshop } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        <WorkshopDetail {...workshop} />
      </div>
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
