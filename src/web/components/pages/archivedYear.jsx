import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import NotFound from '../notFound';
import ObjectList from '../objectList';
import WorkshopSummaryOneLine from '../workshopSummaryOneLine';

import { idFromSlug } from '../../routes';

export default class ArchivedYear extends Component {
  componentWillMount() {
    this.props.onDataRequest(idFromSlug(this.props.routeParams.year));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.routeParams.year !== this.props.routeParams.year) {
      this.props.onDataRequest(idFromSlug(nextProps.routeParams.year));
    }
  }

  render() {
    const { ready, topic, workshops, year } = this.props;

    if (!ready) {
      return null;
    }

    if (!year) {
      return <NotFound />;
    }

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
  onDataRequest: PropTypes.func.isRequired,
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
