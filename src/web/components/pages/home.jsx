import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import React, { Component, PropTypes } from 'react';

import Link from '../link';
import News from '../news';
import YearDetail from '../yearDetail';

export default class Home extends Component {
  componentWillMount() {
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
              startSignupsAt={year.startSignupsAt}
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
