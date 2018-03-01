import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Link from '../../containers/Link';
import Message from '../../containers/Message';
import News from '../../news/components/NewsList';

const HomeMenu = ({ about, news }) => (
  <Container>
    <Row>
      <Col md={6}>
        <h2><Message name="pages.aboutFestival" /></h2>
        <Card>
          <CardBody>
            <Markdown source={about} />
            <ul className="list-unstyled">
              <li><Link to="location"><b>Kde</b> to je?</Link></li>
              <li><Link to="fees"><b>Kolik</b> to stojí?</Link></li>
              <li><Link to="accomodation">Jak je to se <b>spaní</b>m?</Link></li>
              <li><Link to="workshops">Jaké jsou <b>workshop</b>y?</Link></li>
            </ul>
          </CardBody>
        </Card>
      </Col>
      <Col md={6}>
        <h2><Message name="pages.news" /></h2>
        <Card>
          <CardBody>
            <News news={news} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

HomeMenu.propTypes = {
  about: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeMenu;
