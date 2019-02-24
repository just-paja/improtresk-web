import React from 'react'

import { shallow } from 'enzyme'

import FormErrors from '../FormErrors'

describe('FormErrors component', () => {
  it('renders unknown error message', () => {
    const comp = shallow(
      <FormErrors
        errors={['Cannot save data']}
        translate={() => {
          throw new Error('Unknown message')
        }}
      />
    )

    expect(comp.find('Connect(Message)[name="forms.unknownError"]')).toHaveLength(1)
  })

  it('renders known error message', () => {
    const comp = shallow(
      <FormErrors
        errors={['unauthorized']}
        translate={() => 'You are unauthorized'}
      />
    )

    expect(comp.find({ children: 'You are unauthorized' })).toHaveLength(1)
  })

  it('renders empty without errors', () => {
    expect(shallow(
      <FormErrors translate={msg => msg} />
    ).getElement()).toEqual(null)
  })

  it('renders empty when errors are empty', () => {
    expect(shallow(
      <FormErrors errors={[]} translate={msg => msg} />
    ).getElement()).toEqual(null)
  })
})
