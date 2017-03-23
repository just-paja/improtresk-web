import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Button from '../button';
import SurveyPerformer from './performer';

export default class SurveyAnswer extends Component {
  constructor() {
    super();
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote() {
    this.props.onVote(this.props.id);
  }

  render() {
    const {
      disabled,
      performer,
      text,
      votes,
      votesTotal,
    } = this.props;

    return (
      <li className="list-group-item">
        <Row>
          <Col xs={4} sm={2} md={3}>
            {(performer && performer.photos[0] ?
              <Image
                src={performer.photos[0].image}
                responsive
              /> : null
            )}
          </Col>
          <Col xs={8} sm={7} md={6}>
            <h4 className="list-group-item-heading">
              {performer ? performer.name : text}
            </h4>
            {(performer ?
              <SurveyPerformer links={performer.links} /> :
              null
            )}
            <div>
              Pro: {votes}/{votesTotal}
            </div>
          </Col>
          <Col xs={12} sm={3}>
            <Button
              bsSize="small"
              className="pull-right"
              disabled={disabled}
              icon="thumbs-up"
              onClick={this.handleVote}
            >Hlasovat</Button>
          </Col>
        </Row>
      </li>
    );
  }
}

SurveyAnswer.propTypes = {
  id: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  performer: PropTypes.object,
  text: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  votesTotal: PropTypes.number.isRequired,
};

SurveyAnswer.defaultProps = {
  performer: null,
  disabled: false,
};
