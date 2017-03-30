import Helmet from 'react-helmet';
import Col from 'react-bootstrap/lib/Col';
import Markdown from 'react-markdown';
import Row from 'react-bootstrap/lib/Row';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import Gallery from '../gallery';
import HumanDate from '../humanDate';
import News from '../news';
import NotFound from '../notFound';
import SurveyQuestion from '../survey/question';

import { idFromSlug } from '../../routeTable';

const hasVoted = id =>
  global.localStorage && !!global.localStorage.getItem(`votedPoll${id}`);

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
    const { poll, onPollVote, news, newsDetail, ready } = this.props;

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
              property: 'og:type',
              content: 'article',
            },
            {
              property: 'og:name',
              content: newsDetail.name,
            },
            {
              property: 'og:description',
              content: `${newsDetail.text.substr(0, 127)}...`,
            },
            {
              property: 'og:published_time',
              content: news.createdAt,
            },
            {
              property: 'og:modified_time',
              content: news.updatedAt,
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
          <Col md={9}>
            <article>
              <header><h1>{newsDetail.name}</h1></header>
              <Markdown source={newsDetail.text} />
              {newsDetail.poll ? (
                <SurveyQuestion
                  answers={newsDetail.poll.answers}
                  closed={newsDetail.poll.closed}
                  id={newsDetail.poll.id}
                  loading={poll.loading}
                  onVote={onPollVote}
                  question={newsDetail.poll.question}
                  voted={poll.saved || hasVoted(newsDetail.poll.id)}
                  votes={newsDetail.poll.answerCount}
                />
              ) : null}
              <Gallery photos={newsDetail.photos} />
              <footer>
                Zveřejněno{' '}
                <time dateTime={newsDetail.updatedAt}>
                  <HumanDate date={newsDetail.updatedAt} showYear />
                </time>
              </footer>
            </article>
          </Col>
          <Col md={3}>
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
  onPollVote: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  ready: PropTypes.bool,
  routeParams: PropTypes.object.isRequired,
};

NewsDetail.defaultProps = {
  newsDetail: null,
  ready: false,
};
