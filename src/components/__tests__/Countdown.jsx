import moment from 'moment'
import React from 'react'
import sinon from 'sinon'

import { shallow } from 'enzyme'

import Countdown from '../Countdown'

describe('Countdown component', () => {
  let clock

  beforeEach(() => {
    const date = moment('2016-11-22T00:00:00Z').toDate()
    clock = sinon.useFakeTimers(date)
  })

  afterEach(() => {
    clock.restore()
  })

  it('renders time remaining message', () => {
    const comp = shallow(
      <Countdown
        countdownMessage='timeRemaining'
        readyMessage='ready'
        date='2016-11-22T10:00:00Z'
        suffix
      />
    )
    expect(comp.find('Connect(Message)')).toHaveProp('name', 'timeRemaining')
    expect(comp.find('Connect(Message)')).toHaveProp('data', {
      duration: 'in 10 hours'
    })
  })

  it('renders just remaining duration without countdown message', () => {
    const humanized = moment.duration(
      moment('2016-11-22T10:00:00Z').diff(moment())
    ).humanize(true)
    expect(shallow(
      <Countdown
        readyMessage='ready'
        date='2016-11-22T10:00:00Z'
        suffix
      />
    ).getElement()).toEqual(
      <span>{humanized}</span>
    )
  })

  it('renders ready message', () => {
    const comp = shallow(
      <Countdown
        countdownMessage='timeRemaining'
        readyMessage='finished'
        date='2016-11-22T00:00:00Z'
        suffix
      />
    )
    expect(comp.find('Connect(Message)')).toHaveProp('name', 'finished')
  })

  it('renders after a second', () => {
    const comp = shallow(
      <Countdown
        countdownMessage='Time remaining'
        readyMessage='Finished'
        date='2016-11-22T00:00:02Z'
        suffix
      />
    )

    comp.instance().componentDidMount()

    clock.tick(1000)
    expect(comp.state()).toEqual({
      remaining: 1000
    })

    clock.tick(1000)
    expect(comp.state()).toEqual({
      remaining: 0
    })
    comp.instance().componentWillUnmount()
  })

  it('auto stops interval', () => {
    const finishSpy = sinon.spy()
    const comp = shallow(
      <Countdown
        countdownMessage='Time remaining'
        readyMessage='Finished'
        date='2016-11-22T00:00:01Z'
        onFinish={finishSpy}
        suffix
      />
    )

    comp.instance().componentDidMount()

    expect(finishSpy.called).toBe(false)
    clock.tick(10000)
    expect(comp.state()).toEqual({
      remaining: 0
    })
    expect(finishSpy.calledOnce).toBe(true)
  })

  it('auto stops interval without calling anything', () => {
    const comp = shallow(
      <Countdown
        countdownMessage='Time remaining'
        readyMessage='Finished'
        date='2016-11-22T00:00:01Z'
        suffix
      />
    )

    comp.instance().componentDidMount()
    clock.tick(10000)
    expect(comp.state()).toEqual({
      remaining: 0
    })
  })

  it('stores new time when component receives new date', () => {
    const comp = shallow(
      <Countdown
        countdownMessage='Time remaining'
        readyMessage='Finished'
        date='2016-11-23T00:00:01Z'
        suffix
      />
    )

    comp.setProps({
      date: '2016-11-23T01:00:01Z'
    })

    expect(comp).toHaveState('remaining', 90001000)
  })
})
