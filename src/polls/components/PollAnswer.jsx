import Col from 'reactstrap/lib/Col';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';

import Button from '../../components/Button';
import ImageHeader from '../../components/ImageHeader';
import LinkServiceList from '../../components/LinkServiceList';

import styles from './PollAnswer.css';

export default class PollAnswer extends Component {
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
      translate,
      votes,
      votesTotal,
    } = this.props;

    return (
      <li className="list-group-item">
        <Row>
          <Col sm={3} className={styles.imageContainer}>
            {image ? (
              <ImageHeader
                className={styles.image}
                image={image}
                cover
              />
            ) : null}
          </Col>
          <Col sm={6}>
            <h4 className="list-group-item-heading">{text}</h4>
            {links ? <LinkServiceList inline links={links} /> : null}
            <div className={styles.score}>{votes}/{votesTotal}</div>
          </Col>
          <Col sm={3}>
            {closed ? null : (
              <Button
                bsSize="small"
                className="pull-right"
                disabled={disabled}
                loading={loading}
                title={disabled ? translate('polls.alreadyVoted') : null}
                icon="thumbs-up"
                onClick={this.handleVote}
              >
                {translate('polls.vote')}
              </Button>
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

PollAnswer.propTypes = {
  closed: PropTypes.bool,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onVote: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
  votes: PropTypes.number.isRequired,
  votesTotal: PropTypes.number.isRequired,
};

PollAnswer.defaultProps = {
  description: null,
  closed: false,
  disabled: false,
  image: null,
  links: null,
  loading: false,
};
