import classnames from 'classnames';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import React, { PropTypes } from 'react';

import HumanDateRange from './humanDateRange';
import SignupButton from './signupButton';
import styles from './yearDetail.css';

const YearDetail = ({ current, endDate, startDate, startSignupsAt, topic, year }) => (
  <div className={classnames('text-center', styles.container)}>
    <div className={styles.text}>
      <h1>Improtřesk {year} <small className={styles.topic}><i>{topic}</i></small></h1>
      <div className={styles.upcomingDate}>
        <HumanDateRange
          end={endDate}
          start={startDate}
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
                endAt={startDate}
                alreadyFull={false}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    ) : (
      <p className={styles.text}>Sledujte novinky na stránkách Improtřesku</p>
    )}
  </div>
);

YearDetail.propTypes = {
  current: PropTypes.bool,
  endDate: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startSignupsAt: PropTypes.string,
  topic: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

YearDetail.defaultProps = {
  current: false,
  startSignupsAt: null,
};

export default YearDetail;
