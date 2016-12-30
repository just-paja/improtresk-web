import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import Accomodation from '../accomodation';
import Container from '../container';
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
      <Container>
        <h1>Ubytování</h1>
        <Markdown source={intro} />
        <ObjectList
          Component={Accomodation}
          data={accomodations}
        />
      </Container>
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
