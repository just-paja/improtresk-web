import React, { Component, PropTypes } from 'react';

import WorkshopList from '../workshopList';

export default class Workshops extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { ready, workshops } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        <h1>Workshopy</h1>
        <WorkshopList workshops={workshops} />
      </div>
    );
  }
}

Workshops.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Workshops.defaultProps = {
  ready: false,
};
