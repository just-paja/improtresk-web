import React, { Component, PropTypes } from 'react';

import { Col, Row } from 'react-bootstrap';

import News from '../news';
import YearDetail from '../yearDetail';

export default class Home extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { news, ready, year } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        {(
          year ?
            <YearDetail
              endAt={year.endAt}
              startAt={year.startAt}
              topic={year.topic}
              year={year.year}
            /> : null
        )}
        <Row>
          <Col md={6}>
            <h2>O Improtřesku</h2>
            <p>
              Improtřesk je český festival divadelní improvizace a největší setkání
              improvizátorů z celé České republiky. Každý rok se na Improtřesku otevírají
              dílny z oblasti improvizačního divadla na kterých se schází nadšenci
              improvizačního divadla i veřejnost.
            </p>
          </Col>
          <Col md={6}>
            <h2>Aktuality</h2>
            <News news={news} />
          </Col>
        </Row>
      </div>
    );
  }
}

Home.propTypes = {
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
