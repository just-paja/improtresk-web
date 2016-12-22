import React from 'react';
import sinon from 'sinon';

import { Col, Row } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Home from '../../../../src/web/components/pages/home';
import News from '../../../../src/web/components/news';

describe('Home component', () => {
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

  it('renders content', () => {
    expect(shallow(
      <Home
        onMount={() => {}}
        news={[
          { id: 1, text: 'foo', createdAt: '2016-01-02T03:04:05' },
        ]}
        ready
        year={null}
      >
        <div>foo</div>
      </Home>
    ).node).to.eql(
      <div>
        <Row>
          <Col md={6}>
            <h2>O Improtřesku</h2>
            <p>
              Improtřesk je český festival divadelní improvizace a největší setkání
              improvizátorů z celé České republiky. Každý rok se na Improtřesku
              otevírají dílny z oblasti improvizačního divadla na kterých se schází nadšenci
              improvizačního divadla i veřejnost.
            </p>
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
