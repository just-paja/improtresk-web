import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Grid from 'react-bootstrap/lib/Grid';
import NavItem from 'react-bootstrap/lib/NavItem';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Partner from './partner';

import styles from './footer.css';

const Footer = ({ currentYear, partners }) => (
  <footer className={styles.footer}>
    <Grid>
      <Row>
        <Col className={styles.social} xs={6}>
          <ul className="list-inline">
            <NavItem href="https://fb.com/improtresk/" title="Improtřesk na Facebooku">
              <FontAwesome name="facebook-official" />
            </NavItem>
            <NavItem href="https://twitter.com/hashtag/improtresk" title="#Improtřesk na Twitteru">
              <FontAwesome name="twitter" />
            </NavItem>
            <NavItem href="https://maps.google.com/?daddr=Nádražní+846,+399+01+Milevsko" title="Trasa na Improtřesk">
              <FontAwesome name="map-marker" />
            </NavItem>
            <NavItem href="mailto:info@improtresk.cz" title="Uživatelská a technická podpora">
              <FontAwesome name="envelope" />
            </NavItem>
            <NavItem href="tel:+420 735 061 801" title="Nouzový telefon">
              <FontAwesome name="phone" />
            </NavItem>
          </ul>
        </Col>
      </Row>
      {partners.map(partner => <Partner {...partner} />)}
      <p className="text-center">
        &copy; <a href="https://improliga.cz">Česká improvizační liga</a> {currentYear ? currentYear.year : null}
      </p>
    </Grid>
  </footer>
);

Footer.propTypes = {
  currentYear: PropTypes.object,
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Footer;
