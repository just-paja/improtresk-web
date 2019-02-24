import sinon from 'sinon'
import React from 'react'

import { shallow } from 'enzyme'

import Form from '../Form'

describe('Form component', () => {
  it('renders bootstrap form', () => {
    const comp = shallow(
      <Form name='testForm' onSubmit={() => {}}>
        <div className='foo' />
      </Form>
    )
    expect(comp.find('Form')).toHaveLength(1)
  })

  it('renders children', () => {
    const comp = shallow(
      <Form name='testForm' onSubmit={() => {}}>
        <div className='foo' />
      </Form>
    )
    expect(comp.find('.foo')).toHaveLength(1)
  })

  it('prevents default handler on submit', () => {
    const onSubmit = sinon.spy()
    const preventDefault = sinon.spy()
    const comp = shallow(
      <Form name='testForm' onSubmit={onSubmit}>
        <div className='foo' />
      </Form>
    )
    comp.find('Form').simulate('submit', {
      preventDefault
    })
    expect(preventDefault.calledOnce).toBeTruthy()
  })

  it('triggers onSubmit with form name', () => {
    const onSubmit = sinon.spy()
    const preventDefault = sinon.spy()
    const comp = shallow(
      <Form name='testForm' onSubmit={onSubmit} valid>
        <div className='foo' />
      </Form>
    )
    comp.find('Form').simulate('submit', {
      preventDefault
    })
    expect(onSubmit.getCall(0).args).toEqual(['testForm'])
    expect(onSubmit.calledOnce).toBeTruthy()
  })
})
