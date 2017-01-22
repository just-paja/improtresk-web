import Col from 'react-bootstrap/lib/Col';
import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Container from './container';
import Link from './link';
import News from './news';

const HomeMenu = ({ about, news }) => (
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
);

HomeMenu.propTypes = {
  about: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeMenu;
