import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Button from '../button';
import LinkServiceList from '../linkServiceList';

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
      closed,
      description,
      disabled,
      image,
      links,
      loading,
      text,
      votes,
      votesTotal,
    } = this.props;

    return (
      <li className="list-group-item">
        <Row>
          <Col xs={4} sm={2} md={3}>
            {image ? <Image src={image} responsive /> : null}
          </Col>
          <Col xs={8} sm={7} md={6}>
            <h4 className="list-group-item-heading">{text}</h4>
            {links ? <LinkServiceList inline links={links} /> : null}
            <div>Pro: {votes}/{votesTotal}</div>
          </Col>
          <Col xs={12} sm={3}>
            {closed ? null : (
              <Button
                bsSize="small"
                className="pull-right"
                disabled={disabled}
                loading={loading}
                title={disabled ? 'Už jsi hlasoval' : null}
                icon="thumbs-up"
                onClick={this.handleVote}
              >Hlasovat</Button>
            )}
          </Col>
        </Row>
        {description ? (
          <div>
            <hr />
            <Markdown source={description} />
          </div>
        ) : null}
      </li>
    );
  }
}

SurveyAnswer.propTypes = {
  closed: PropTypes.bool,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onVote: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  votesTotal: PropTypes.number.isRequired,
};

SurveyAnswer.defaultProps = {
  description: null,
  closed: false,
  disabled: false,
  image: null,
  links: null,
  loading: false,
  performer: null,
};
