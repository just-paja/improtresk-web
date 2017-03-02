import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import LocationItem from '../locationItem';
import ObjectList from '../objectList';
import MarkerMap from '../markerMap';

import WellWithDecoration from '../wellWithDecoration';

export default class Locations extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { intro, markers, ready } = this.props;
    const title = 'Lokace';

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <h1>{title}</h1>
        <Markdown source={intro} />
        <MarkerMap markers={markers} />
        <WellWithDecoration image="/static/theme/2017/bg-leave.jpg">
          <ObjectList
            data={markers}
            Component={LocationItem}
          />
        </WellWithDecoration>
      </Container>
    );
  }
}

Locations.propTypes = {
  intro: PropTypes.string.isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })).isRequired,
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
};

Locations.defaultProps = {
  ready: false,
};
