import Helmet from 'react-helmet';
import Col from 'react-bootstrap/lib/Col';
import Markdown from 'react-markdown';
import Row from 'react-bootstrap/lib/Row';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import News from '../news';

import { idFromSlug } from '../../routes';

export default class NewsDetail extends Component {
  componentWillMount() {
    this.props.onMount(idFromSlug(this.props.routeParams.slug));
  }

  render() {
    const { news, newsDetail, ready } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <Helmet
          title={newsDetail.title}
          meta={[
            {
              property: 'og:title',
              content: `${newsDetail.text.substr(0, 127)}...`,
            },
          ]}
        />
        <Row>
          <Col md={8}>
            <h1>{newsDetail.title}</h1>
            <Markdown source={newsDetail.text} />
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
