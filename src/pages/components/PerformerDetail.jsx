import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import Col from 'reactstrap/lib/Col';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Gallery from '../../components/Gallery';
import Link from '../../containers/Link';
import LinkServiceList from '../../components/LinkServiceList';
import NotFound from '../NotFound';

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
            <Link to="performerDetail" params={{ slug: performer.slug }}>{performer.name}</Link>
          </li>
        </Breadcrumb>
        <Row>
          <Col md={8}>
            <Markdown source={performer.text} />
          </Col>
          <Col md={4}>
            {performer.links.length ? (
              <LinkServiceList links={performer.links} />
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
