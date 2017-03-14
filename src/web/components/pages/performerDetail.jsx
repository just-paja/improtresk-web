import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import Gallery from '../gallery';
import NotFound from '../notFound';

import { idFromSlug } from '../../routeTable';

export default class PerformerDetail extends Component {
  componentWillMount() {
    this.props.onMount(idFromSlug(this.props.routeParams.slug));
  }

  render() {
    const { performer, ready } = this.props;

    if (!ready) {
      return null;
    }

    if (!performer) {
      return <NotFound />;
    }

    return (
      <Container>
        <Helmet
          meta={[
            ...performer.photos.reduce((data, photo) => ([
              ...data,
              {
                property: 'og:image',
                content: photo.image,
              },
              {
                property: 'og:image:height',
                content: photo.height,
              },
              {
                property: 'og:image:width',
                content: photo.width,
              },
            ]), []),
          ]}
        />

        <h1>{performer.name}</h1>
        <Markdown source={performer.text} />
        <Gallery photos={performer.photos} />
      </Container>
    );
  }
}

PerformerDetail.propTypes = {
  performer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  routeParams: PropTypes.object.isRequired,
};

PerformerDetail.defaultProps = {
  performer: null,
  ready: false,
};
