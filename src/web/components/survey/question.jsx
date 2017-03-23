import ListGroup from 'react-bootstrap/lib/ListGroup';
import React, { Component, PropTypes } from 'react';

import SurveyAnswer from './answer';

const hasVoted = id => !!localStorage.getItem(`votedPoll${id}`);

export default class Question extends Component {
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
      form,
      id,
      question,
      votes,
    } = this.props;
    return (
      <div>
        <h3>{question}</h3>
        <ListGroup>
          {answers.map(answer => (
            <SurveyAnswer
              id={answer.id}
              closed={closed}
              disabled={form.loading || form.saved || hasVoted(id)}
              key={answer.id}
              onVote={this.handleVote}
              performer={answer.performer}
              text={answer.text}
              votes={answer.answerCount}
              votesTotal={votes}
            />
          ))}
        </ListGroup>
      </div>
    );
  }
}

Question.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    performer: PropTypes.object,
    text: PropTypes.string.isRequired,
    answerCount: PropTypes.number.isRequired,
  })).isRequired,
  closed: PropTypes.bool,
  form: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};

Question.defaultProps = {
  closed: false,
};
