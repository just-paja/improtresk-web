import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Grid from 'react-bootstrap/lib/Grid';
import NavItem from 'react-bootstrap/lib/NavItem';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Footer from '../../../src/web/components/footer';
import Partner from '../../../src/web/components/partner';

describe('Footer component', () => {
  it('renders without current year', () => {
    expect(shallow(
      <Footer
        partners={[
          {
            name: 'Škola improvizace',
            logo: 'https://improtresk.cz/static/logo-skola-improvizace.png',
          },
          {
            name: 'Dům Kultury Milevsko',
            logo: 'https://improtresk.cz/static/logo-dk.png',
          },
        ]}
      />
    ).node).to.eql(
      <footer className="footer-footer">
        <Grid>
          <Row>
            <Col className="footer-social" md={6}>
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
                <NavItem href="tel:+420 728 376 440" title="Kontaktní telefon">
                  <FontAwesome name="phone" />
                </NavItem>
              </ul>
            </Col>
          </Row>
          <Partner
            name="Škola improvizace"
            logo="https://improtresk.cz/static/logo-skola-improvizace.png"
          />
          <Partner
            name="Dům Kultury Milevsko"
            logo="https://improtresk.cz/static/logo-dk.png"
          />
          <p className="text-center">
            &copy; <a href="https://improliga.cz">Česká improvizační liga</a>{' '}
          </p>
        </Grid>
      </footer>
    );
  });
  it('renders with current year', () => {
    expect(shallow(
      <Footer
        currentYear={{
          year: '2017',
        }}
        partners={[]}
      />
    ).node).to.eql(
      <footer className="footer-footer">
        <Grid>
          <Row>
            <Col className="footer-social" md={6}>
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
                <NavItem href="tel:+420 728 376 440" title="Kontaktní telefon">
                  <FontAwesome name="phone" />
                </NavItem>
              </ul>
            </Col>
          </Row>
          <p className="text-center">
            &copy; <a href="https://improliga.cz">Česká improvizační liga</a> 2017
          </p>
        </Grid>
      </footer>
    );
  });
});
