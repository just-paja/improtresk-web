import Helmet from 'react-helmet';
import Col from 'react-bootstrap/lib/Col';
import Markdown from 'react-markdown';
import Row from 'react-bootstrap/lib/Row';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import Gallery from '../gallery';
import News from '../news';
import NotFound from '../notFound';

import { idFromSlug } from '../../routeTable';

export default class NewsDetail extends Component {
  componentWillMount() {
    this.props.onMount(idFromSlug(this.props.routeParams.slug));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.routeParams.slug !== this.props.routeParams.slug) {
      this.props.onMount(idFromSlug(nextProps.routeParams.slug));
    }
  }

  render() {
    const { news, newsDetail, ready } = this.props;

    if (!ready) {
      return null;
    }

    if (!newsDetail) {
      return <NotFound />;
    }

    return (
      <Container>
        <Helmet
          name={newsDetail.name}
          meta={[
            {
              property: 'og:name',
              content: newsDetail.name,
            },
            {
              property: 'og:description',
              content: `${newsDetail.text.substr(0, 127)}...`,
            },
            ...newsDetail.photos.reduce((data, photo) => ([
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
        <Row>
          <Col md={8}>
            <h1>{newsDetail.name}</h1>
            <Markdown source={newsDetail.text} />
            <Gallery photos={newsDetail.photos} />
          </Col>
          <Col md={4}>
            <h2>Ostatní novinky</h2>
            <News news={news} />
          </Col>
        </Row>
      </Container>
    );
  }
}

NewsDetail.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  newsDetail: PropTypes.object,
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  routeParams: PropTypes.object.isRequired,
};

NewsDetail.defaultProps = {
  newsDetail: null,
  ready: false,
};
