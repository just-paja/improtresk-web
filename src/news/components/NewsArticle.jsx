import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React from 'react';

import { NewsItem } from '../../proptypes';

import Gallery from '../../components/Gallery';
import HumanDate from '../../components/HumanDate';
import Message from '../../containers/Message';
import PollQuestion from '../../polls/components/PollQuestion';

const hasVoted = id =>
  global.localStorage && !!global.localStorage.getItem(`votedPoll${id}`);


const NewsArticle = ({ newsDetail, onVote }) => (
  <article>
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
          content: newsDetail.createdAt,
        },
        {
          property: 'og:modified_time',
          content: newsDetail.updatedAt,
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
    <header><h1>{newsDetail.name}</h1></header>
    <Card>
      <CardBody>
        <Markdown source={newsDetail.text} />
        {newsDetail.poll ? (
          <PollQuestion
            answers={newsDetail.poll.answers}
            closed={newsDetail.poll.closed}
            id={newsDetail.poll.id}
            loading={newsDetail.poll.loading}
            onVote={onVote}
            question={newsDetail.poll.question}
            voted={newsDetail.poll.saved || hasVoted(newsDetail.poll.id)}
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
);

NewsArticle.propTypes = {
  newsDetail: NewsItem.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default NewsArticle;
