import Markdown from 'react-markdown';
import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Container from '../../../src/web/components/container';
import HomeMenu from '../../../src/web/components/homeMenu';
import Link from '../../../src/web/components/link';
import News from '../../../src/web/components/news';

describe('Home Menu component', () => {
  it('renders content', () => {
    expect(shallow(
      <HomeMenu
        about="bla bla bla"
        news={[
          { topic: 'Foo' },
          { topic: 'Bar' },
        ]}
      />
    ).node).to.eql(
      <Container>
        <Row>
          <Col md={6}>
            <h2>O Improtřesku</h2>
            <Markdown source="bla bla bla" />

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
            <News
              news={[
                { topic: 'Foo' },
                { topic: 'Bar' },
              ]}
            />
          </Col>
        </Row>
      </Container>
    );
  });
});
