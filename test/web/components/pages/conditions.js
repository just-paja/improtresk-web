import Markdown from 'react-markdown';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Conditions from '../../../../src/web/components/pages/conditions';
import Link from '../../../../src/web/components/link';

describe('Conditions page component', () => {
  it('empty when not ready', () => {
    expect(shallow(
      <Conditions
        onMount={() => {}}
        news={[]}
        year={null}
      />
    ).node).to.equal(null);
  });

  it('renders content with year', () => {
    expect(shallow(
      <Conditions
        onMount={() => {}}
        conditions={{
          text: 'foo',
        }}
        ready
        year={{
          year: '2017',
        }}
      />
    ).node).to.eql(
      <div>
        <h1>Podmínky pro účastníky (Improtřesk 2017)</h1>
        <Markdown source="foo" />
      </div>
    );
  });

  it('renders content without conditions', () => {
    expect(shallow(
      <Conditions
        onMount={() => {}}
        conditions={null}
        ready
        year={null}
      />
    ).node).to.eql(
      <div>
        <h1>Podmínky pro účastníky</h1>
        <p>
          Podmínky pro účastníky za tento ročník ještě nejsou zveřejněné. Organizátoři
          by to měli co nejrychleji napravit, zkuste je{' '}
          <Link to="contact">popohnat</Link>.
        </p>
      </div>
    );
  });

  it('renders content', () => {
    expect(shallow(
      <Conditions
        onMount={() => {}}
        conditions={{
          text: 'foo',
        }}
        ready
        year={null}
      />
    ).node).to.eql(
      <div>
        <h1>Podmínky pro účastníky</h1>
        <Markdown source="foo" />
      </div>
    );
  });

  it('calls onMount on componentWillMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <Conditions
        onMount={mountSpy}
        news={[]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
  });
});