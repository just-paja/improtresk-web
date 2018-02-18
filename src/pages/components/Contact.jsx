import Helmet from 'react-helmet';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <div className="text-center">
          <h1>Kontakt</h1>
          <p>
            Organizátorem festivalu Improtřesk 2016 je{' '}
            <a href="https://improliga.cz">Česká improvizační liga z. s.</a>
            {' '}ve spolupráci s{' '}
            <a href="http://www.milevskem.cz/kultura-a-volny-cas/dum-kultury-milevsko/o-nas">DK Milevsko</a>.
          </p>
          <ul className="list-unstyled">
            <li>
              <FontAwesome name="globe" />{' '}
              Web: <a href="https://improtresk.cz">improtresk.cz</a>
            </li>
            <li>
              <FontAwesome name="envelope-o" />{' '}
              E-mail: <a href="mailto:info@improtresk.cz">info@improtresk.cz</a>
            </li>
            <li>
              <FontAwesome name="phone" />{' '}
              Kontaktní telefon telefon: <a href="tel:+420 728 376 440">+420 728 376 440</a>
            </li>
            <li>
              <FontAwesome name="facebook-official" />{' '}
              Facebook: <a href="https://fb.com/improligacz">improligacz</a>
            </li>
          </ul>
        </div>
      </Container>
    );
  }
}

Contact.propTypes = {
  onMount: PropTypes.func.isRequired,
};
