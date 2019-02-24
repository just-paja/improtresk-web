import React from 'react'
import sinon from 'sinon'

import { shallow } from 'enzyme'

import ResetPasswordForm from '../ResetPasswordForm'

describe('ResetPasswordForm component', () => {
  it('renders email input', () => {
    const comp = shallow(
      <ResetPasswordForm
        form='resetPassword'
        translate={msg => msg}
        submit={() => {}}
      />
    )
    expect(comp.find('[name="email"]')).toHaveLength(1)
  })

  it('triggers submit with form', () => {
    const submit = sinon.spy()
    const comp = shallow(
      <ResetPasswordForm
        form='resetPassword'
        translate={msg => msg}
        submit={submit}
      />
    )

    comp.simulate('submit')
    expect(submit.calledOnce).toBeTruthy()
  })
})
