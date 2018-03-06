import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import NewsArticle from '../../news/containers/NewsArticle';
import NewsList from '../../news/containers/NewsList';

export default class NewsDetail extends Component {
  componentWillMount() {
    this.props.onResourceChange(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.props.onResourceChange(this.props.match.params.slug);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <Container>
        <Row>
          <Col xs={12} md={8} lg={7}>
            <NewsArticle resourceId={match.params.slug} />
          </Col>
          <Col xs={12} md={4} lg={5}>
            <h2><Message name="news.older" /></h2>
            <NewsList />
          </Col>
        </Row>
      </Container>
    );
  }
}

NewsDetail.propTypes = {
  match: PropTypes.object.isRequired,
  onResourceChange: PropTypes.func.isRequired,
};
