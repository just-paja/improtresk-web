import BootstrapButton from 'reactstrap/lib/Button'
import FontAwesome from 'react-fontawesome'
import React from 'react'

import { shallow } from 'enzyme'

import Button from '../Button'

describe('Button component', () => {
  it('renders a button', () => {
    expect(shallow(<Button>foo</Button>).getElement()).toEqual(
      <BootstrapButton className='buttonSize' disabled={false}>
        <FontAwesome className='buttonFa' name='floppy-o' />
        foo
      </BootstrapButton>
    )
  })

  it('renders a disabled button with rotating icon when loading', () => {
    expect(shallow(<Button loading>foo</Button>).getElement()).toEqual(
      <BootstrapButton className='buttonSize' disabled>
        <FontAwesome className='buttonFa fa-spin' name='circle-o-notch' />
        foo
      </BootstrapButton>
    )
  })
})
