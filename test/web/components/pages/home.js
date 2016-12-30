import Grid from 'react-bootstrap/lib/Grid';
import Markdown from 'react-markdown';
import React from 'react';
import sinon from 'sinon';

import { Col, Row } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Home from '../../../../src/web/components/pages/home';
import Link from '../../../../src/web/components/link';
import News from '../../../../src/web/components/news';
import YearDetail from '../../../../src/web/components/yearDetail';

describe('Home page component', () => {
  it('empty when not ready', () => {
    expect(shallow(
      <Home
        onMount={() => {}}
        news={[]}
        year={null}
      >
        <div>foo</div>
      </Home>
    ).node).to.equal(null);
  });

  it('empty when not ready and no year', () => {
    expect(shallow(
      <Home
        onMount={() => {}}
        news={[]}
        ready
        year={null}
      >
        <div>foo</div>
      </Home>
    ).node).to.equal(null);
  });

  it('renders content', () => {
    expect(shallow(
      <Home
        about="bla bla bla"
        onMount={() => {}}
        news={[
          { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
        ]}
        ready
        year={{
          current: false,
          startAt: '2016-01-02',
          endAt: '2016-01-05',
          startSignupsAt: '2016-01-01T00:00:00',
          topic: 'foo',
          year: '2016',
        }}
      >
        <div>foo</div>
      </Home>
    ).node).to.eql(
      <div className="year-2016 year-next">
        <YearDetail
          endAt="2016-01-05"
          startAt="2016-01-02"
          startSignupsAt="2016-01-01T00:00:00"
          topic="foo"
          year="2016"
        />
        <Grid>
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
                  { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
                ]}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  });

  it('calls onMount on componentWillMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <Home
        onMount={mountSpy}
        news={[]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
  });
});
