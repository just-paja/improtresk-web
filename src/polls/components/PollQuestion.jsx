import ListGroup from 'reactstrap/lib/ListGroup';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PollAnswer from './PollAnswer';

import { PollAnswer as PollAnswerType } from '../../proptypes';

export default class PollQuestion extends Component {
  constructor() {
    super();
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(id) {
    this.props.onVote(this.props.id, id);
  }

  render() {
    const {
      answers,
      closed,
      loading,
      question,
      translate,
      voted,
      votes,
    } = this.props;
    return (
      <div>
        <h3>{question}</h3>
        <ListGroup>
          {answers.map(answer => (
            <PollAnswer
              closed={closed}
              description={answer.description}
              disabled={voted}
              id={answer.id}
              image={answer.image}
              key={answer.id}
              links={answer.links}
              loading={loading}
              onVote={this.handleVote}
              text={answer.text}
              translate={translate}
              votes={answer.answerCount}
              votesTotal={votes}
            />
          ))}
        </ListGroup>
      </div>
    );
  }
}

PollQuestion.propTypes = {
  answers: PropTypes.arrayOf(PollAnswerType).isRequired,
  closed: PropTypes.bool,
  id: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onVote: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
  voted: PropTypes.bool,
  votes: PropTypes.number.isRequired,
};

PollQuestion.defaultProps = {
  closed: false,
  loading: false,
  voted: false,
};
