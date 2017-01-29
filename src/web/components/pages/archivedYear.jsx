import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import ObjectList from '../objectList';
import WorkshopSummaryOneLine from '../workshopSummaryOneLine';

export default class ArchivedYear extends Component {
  componentWillMount() {
    this.props.onMount(this.props.routeParams.year);
  }

  render() {
    const { ready, topic, workshops, year } = this.props;

    if (!ready) {
      return null;
    }

    // FIXME: Should render 404 page when object is not found

    const title = `Ročník ${year}`;
    const titleFull = `${title}: ${topic}`;

    return (
      <Container>
        <Helmet
          title={titleFull}
          meta={[
            { property: 'og:title', content: titleFull },
          ]}
        />
        <h1>{title}<br /><small>{topic}</small></h1>
        <h2>Workshopy</h2>
        <ObjectList
          Component={WorkshopSummaryOneLine}
          data={workshops}
        />
      </Container>
    );
  }
}

ArchivedYear.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  routeParams: PropTypes.shape({
    year: PropTypes.string,
  }).isRequired,
  topic: PropTypes.string,
  workshops: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    lectorName: PropTypes.string,
    name: PropTypes.string,
  })),
  year: PropTypes.string,
};

ArchivedYear.defaultProps = {
  ready: false,
  topic: null,
  workshops: null,
  year: null,
};
