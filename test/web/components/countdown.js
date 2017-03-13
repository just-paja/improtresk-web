import React from 'react';
import sinon from 'sinon';

import moment from 'moment';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Countdown from '../../../src/web/components/countdown';

describe('Countdown component', () => {
  let clock;

  beforeEach(() => {
    const date = moment('2016-11-22T00:00:00Z');
    clock = sinon.useFakeTimers(date.valueOf());
  });

  afterEach(() => {
    clock.restore();
  });

  it('renders', () => {
    const humanized = moment.duration(
      moment('2016-11-22T10:00:00Z').diff(moment())
    ).humanize(true);
    expect(shallow(
      <Countdown
        countdownMessage="Time remaining"
        date="2016-11-22T10:00:00Z"
        suffix
      />
    ).node).to.eql(
      <span>Time remaining {humanized}</span>
    );
  });
  it('renders without countdown message', () => {
    const humanized = moment.duration(
      moment('2016-11-22T10:00:00Z').diff(moment())
    ).humanize(true);
    expect(shallow(
      <Countdown
        date="2016-11-22T10:00:00Z"
        suffix
      />
    ).node).to.eql(
      <span>{humanized}</span>
    );
  });
  it('renders ready', () => {
    expect(shallow(
      <Countdown
        countdownMessage="Time remaining"
        readyMessage="Finished"
        date="2016-11-22T00:00:00Z"
        suffix
      />
    ).node).to.eql(
      <span>Finished</span>
    );
  });
  it('renders after a second', () => {
    const comp = shallow(
      <Countdown
        countdownMessage="Time remaining"
        readyMessage="Finished"
        date="2016-11-22T00:00:02Z"
        suffix
      />
    );

    comp.instance().componentDidMount();

    clock.tick(1000);
    expect(comp.state()).to.eql({
      remaining: 1000,
    });

    clock.tick(1000);
    expect(comp.state()).to.eql({
      remaining: 0,
    });
    comp.instance().componentWillUnmount();
  });
  it('auto stops interval', () => {
    const finishSpy = sinon.spy();
    const comp = shallow(
      <Countdown
        countdownMessage="Time remaining"
        readyMessage="Finished"
        date="2016-11-22T00:00:01Z"
        onFinish={finishSpy}
        suffix
      />
    );

    comp.instance().componentDidMount();

    expect(finishSpy.called).to.equal(false);
    clock.tick(10000);
    expect(comp.state()).to.eql({
      remaining: 0,
    });
    expect(finishSpy.calledOnce).to.equal(true);
  });
  it('auto stops interval without calling anything', () => {
    const comp = shallow(
      <Countdown
        countdownMessage="Time remaining"
        readyMessage="Finished"
        date="2016-11-22T00:00:01Z"
        suffix
      />
    );

    comp.instance().componentDidMount();
    clock.tick(10000);
    expect(comp.state()).to.eql({
      remaining: 0,
    });
  });
});
