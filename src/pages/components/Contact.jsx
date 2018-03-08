import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Col from 'reactstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Message from '../../containers/Message';

export default class Contact extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { translate } = this.props;
    const title = translate('pages.contact');

    return (
      <Container>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <h1 className="text-center">{title}</h1>
        <Row>
          <Col md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
            <Card>
              <CardBody>
                <p>
                  <Message name="pages.festivalOrg" />
                </p>
                <ul className="list-unstyled">
                  <li>
                    <FontAwesome fixedWidth name="globe" />{' '}
                    <Message name="generic.website" />:{' '}
                    <a href="https://improtresk.cz">improtresk.cz</a>
                  </li>
                  <li>
                    <FontAwesome fixedWidth name="envelope-o" />{' '}
                    <Message name="generic.email" />:{' '}
                    <a href="mailto:info@improtresk.cz">info@improtresk.cz</a>
                  </li>
                  <li>
                    <FontAwesome fixedWidth name="phone" />{' '}
                    <Message name="generic.contactPhone" />:{' '}
                    Vanda Gabrielová{' '}
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
  translate: PropTypes.func.isRequired,
};
