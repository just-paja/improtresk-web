import classnames from 'classnames';
import Col from 'react-bootstrap/lib/Col';
import Markdown from 'react-markdown';
import Row from 'react-bootstrap/lib/Row';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import Link from '../link';
import News from '../news';
import YearDetail from '../yearDetail';

export default class Home extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { about, news, ready, year } = this.props;

    if (!ready || !year) {
      return null;
    }

    const yearClass = `year-${year.year}`;

    return (
      <div
        className={classnames([yearClass], {
          'year-next': !year.current,
        })}
      >
        <YearDetail
          endAt={year.endAt}
          startAt={year.startAt}
          startSignupsAt={year.startSignupsAt}
          topic={year.topic}
          year={year.year}
        />
        <Container>
          <Row>
            <Col md={6}>
              <h2>O Improtřesku</h2>
              <Markdown source={about} />

              <h3>Rychlé odkazy</h3>
              <ul className="list-unstyled">
                <li><Link to="location"><b>Kde</b> to je?</Link></li>
                <li><Link to="fees"><b>Kolik</b> to stojí?</Link></li>
                <li><Link to="accomodation">Jak je to se <b>spaní</b>m?</Link></li>
                <li><Link to="workshops">Jaké jsou <b>workshop</b>y?</Link></li>
              </ul>
            </Col>
            <Col md={6}>
              <h2>Novinky</h2>
              <News news={news} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  about: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  year: PropTypes.shape({
    endAt: PropTypes.string,
    startAt: PropTypes.string,
    topic: PropTypes.string,
    year: PropTypes.string,
  }),
};

Home.defaultProps = {
  ready: false,
};
