import React, { Component, PropTypes } from 'react';

import Accomodation from '../accomodation';
import ObjectList from '../objectList';

export default class Accomodations extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { accomodations, ready } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        <h1>Ubytování</h1>
        <ObjectList
          Component={Accomodation}
          data={accomodations}
        />
      </div>
    );
  }
}

Accomodations.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  accomodations: PropTypes.arrayOf(PropTypes.object),
};

Accomodations.defaultProps = {
  ready: false,
};
