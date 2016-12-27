import Grid from 'react-bootstrap/lib/Grid';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import Accomodation from '../accomodation';
import ObjectList from '../objectList';

export default class Accomodations extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { accomodations, intro, ready } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Grid>
        <h1>Ubytování</h1>
        <Markdown source={intro} />
        <ObjectList
          Component={Accomodation}
          data={accomodations}
        />
      </Grid>
    );
  }
}

Accomodations.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  accomodations: PropTypes.arrayOf(PropTypes.object),
  intro: PropTypes.string.isRequired,
};

Accomodations.defaultProps = {
  ready: false,
};
