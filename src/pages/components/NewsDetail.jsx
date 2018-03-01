import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Helmet from 'react-helmet';
import Col from 'reactstrap/lib/Col';
import Markdown from 'react-markdown';
import Row from 'reactstrap/lib/Row';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import Gallery from '../../components/Gallery';
import HumanDate from '../../components/HumanDate';
import Message from '../../containers/Message';
import News from '../../news/components/NewsList';
import PollQuestion from '../../polls/components/PollQuestion';

const hasVoted = id =>
  global.localStorage && !!global.localStorage.getItem(`votedPoll${id}`);

const NewsDetail = ({
  poll,
  onPollVote,
  news,
  newsDetail,
}) => (
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
          <Card>
            <CardBody>
              <Markdown source={newsDetail.text} />
              {newsDetail.poll ? (
                <PollQuestion
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
                <Message name="news.published" />
                {' '}
                <time dateTime={newsDetail.updatedAt}>
                  <HumanDate date={newsDetail.updatedAt} showYear />
                </time>
              </footer>
            </CardBody>
          </Card>
        </article>
      </Col>
      <Col md={3}>
        <h2><Message name="news.older" /></h2>
        <News news={news} />
      </Col>
    </Row>
  </Container>
);

NewsDetail.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  newsDetail: PropTypes.object,
  onPollVote: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
};

NewsDetail.defaultProps = {
  newsDetail: null,
};

export default NewsDetail;
