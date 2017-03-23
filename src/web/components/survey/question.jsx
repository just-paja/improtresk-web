import ListGroup from 'react-bootstrap/lib/ListGroup';
import React, { Component, PropTypes } from 'react';

import SurveyAnswer from './answer';

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
      loading,
      question,
      voted,
      votes,
    } = this.props;
    return (
      <div>
        <h3>{question}</h3>
        <ListGroup>
          {answers.map(answer => (
            <SurveyAnswer
              closed={closed}
              description={answer.description}
              disabled={voted}
              id={answer.id}
              key={answer.id}
              links={answer.links}
              image={answer.image}
              loading={loading}
              onVote={this.handleVote}
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
  id: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onVote: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  voted: PropTypes.bool,
  votes: PropTypes.number.isRequired,
};

Question.defaultProps = {
  closed: false,
  loading: false,
  voted: false,
};
