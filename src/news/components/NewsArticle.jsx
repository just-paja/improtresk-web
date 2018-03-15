import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React from 'react';

import { NewsItem } from '../../proptypes';

import Gallery from '../../components/Gallery';
import HelmetArticle from '../../components/HelmetArticle';
import HumanDate from '../../components/HumanDate';
import Message from '../../containers/Message';
import PollQuestion from '../../polls/components/PollQuestion';


const NewsArticle = ({ newsDetail, onVote }) => (
  <article>
    <HelmetArticle
      description={`${newsDetail.text.substr(0, 127)}...`}
      name={newsDetail.name}
      createdAt={newsDetail.createdAt}
      updatedAt={newsDetail.updatedAt}
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
            voted={newsDetail.poll.saved || newsDetail.poll.voted}
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
