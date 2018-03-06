import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import classnames from 'classnames';
import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Link from '../../containers/Link';
import Message from '../../containers/Message';
import NewsList from '../../news/containers/NewsList';
import TextHome from '../../texts/containers/TextHome';
import YearDetail from '../../years/components/YearDetail';

const Home = ({ year }) => {
  const yearClass = `year-${year.year}`;

  return (
    <div
      className={classnames([yearClass], {
        'year-next': !year.current,
      })}
    >
      <YearDetail
        current={year.current}
        endDate={year.endDate}
        startDate={year.startDate}
        startSignupsAt={year.startSignupsAt}
        topic={year.topic}
        year={year.year}
      />
      {year.current ? (
        <Container>
          <Row>
            <Col className="mb-4" xs={12} md={6}>
              <h2><Message name="pages.aboutFestival" /></h2>
              <Card>
                <CardBody>
                  <TextHome skipFirstHeading />
                  <ul className="list-unstyled">
                    <li><Link to="location"><b>Kde</b> to je?</Link></li>
                    <li><Link to="fees"><b>Kolik</b> to stojí?</Link></li>
                    <li><Link to="accomodation">Jak je to se <b>spaní</b>m?</Link></li>
                    <li><Link to="workshops">Jaké jsou <b>workshop</b>y?</Link></li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <h2><Message name="pages.news" /></h2>
              <Card>
                <CardBody>
                  <NewsList />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
};

Home.propTypes = {
  year: PropTypes.shape({
    endDate: PropTypes.string,
    startAt: PropTypes.string,
    topic: PropTypes.string,
    year: PropTypes.string,
  }),
};

Home.defaultProps = {
  year: null,
};

export default Home;
