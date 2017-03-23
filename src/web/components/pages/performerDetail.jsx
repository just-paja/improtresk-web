import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import Col from 'react-bootstrap/lib/Col';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Well from 'react-bootstrap/lib/Well';

import Container from '../container';
import Gallery from '../gallery';
import Link from '../link';
import LinkServiceList from '../linkServiceList';
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
        <Breadcrumb>
          <li><Link to="schedule">Program</Link></li>
          <li className="active">
            <Link to="performers:item" params={{ slug: performer.slug }}>{performer.name}</Link>
          </li>
        </Breadcrumb>
        <Row>
          <Col md={8}>
            <Markdown source={performer.text} />
          </Col>
          <Col md={4}>
            {performer.links.length ? (
              <Well>
                <LinkServiceList links={performer.links} />
              </Well>
            ) : null}
          </Col>
        </Row>
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
