import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Col from 'reactstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';

export default class Contact extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const title = 'Kontakt';

    return (
      <Container>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <h1 className="text-center">Kontakt</h1>
        <Row>
          <Col md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
            <Card>
              <CardBody>
                <p>
                  Organizátorem festivalu Improtřesk 2016 je{' '}
                  <a href="https://improliga.cz">Česká improvizační liga z. s.</a>
                  {' '}ve spolupráci s{' '}
                  <a href="http://www.milevskem.cz/kultura-a-volny-cas/dum-kultury-milevsko/o-nas">DK Milevsko</a>.
                </p>
                <ul className="list-unstyled">
                  <li>
                    <FontAwesome fixedWidth name="globe" />{' '}
                    Web: <a href="https://improtresk.cz">improtresk.cz</a>
                  </li>
                  <li>
                    <FontAwesome fixedWidth name="envelope-o" />{' '}
                    E-mail: <a href="mailto:info@improtresk.cz">info@improtresk.cz</a>
                  </li>
                  <li>
                    <FontAwesome fixedWidth name="phone" />{' '}
                    Kontaktní telefon: Vanda Gabrielová
                    {' '}
                    <a href="tel:+420 728 376 440">+420 728 376 440</a>
                  </li>
                  <li>
                    <FontAwesome fixedWidth name="facebook-official" />{' '}
                    Facebook: <a href="https://fb.com/improligacz">improligacz</a>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Contact.propTypes = {
  onMount: PropTypes.func.isRequired,
};
