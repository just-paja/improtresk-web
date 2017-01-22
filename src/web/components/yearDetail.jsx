import classnames from 'classnames';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import React, { PropTypes } from 'react';

import HumanDateRange from './humanDateRange';
import SignupButton from './signupButton';
import styles from './yearDetail.css';

const YearDetail = ({ current, endAt, startAt, startSignupsAt, topic, year }) => (
  <div className={classnames('text-center', styles.container)}>
    <div className={styles.text}>
      <h1>Improtřesk {year} <small className={styles.topic}><i>{topic}</i></small></h1>
      <div className={styles.upcomingDate}>
        <HumanDateRange
          end={endAt}
          start={startAt}
        />
      </div>
    </div>
    {current ? (
      <div className={styles.buttons}>
        <Grid>
          <Row>
            <Col xs={8} xsOffset={4} sm={6} smOffset={6} md={4} mdOffset={8}>
              <SignupButton
                startAt={startSignupsAt}
                endAt={startAt}
                alreadyFull={false}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    ) : null}
  </div>
);

YearDetail.propTypes = {
  current: PropTypes.bool,
  endAt: PropTypes.string.isRequired,
  startAt: PropTypes.string.isRequired,
  startSignupsAt: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

YearDetail.defaultProps = {
  current: false,
};

export default YearDetail;
