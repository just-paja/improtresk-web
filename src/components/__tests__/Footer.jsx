import React from 'react'

import { shallow } from 'enzyme'

import Footer from '../Footer'

describe('Footer component', () => {
  it('renders without current year', () => {
    const comp = shallow(
      <Footer
        partners={[
          {
            name: 'Škola improvizace',
            logo: 'https://improtresk.cz/static/logo-skola-improvizace.png'
          },
          {
            name: 'Dům Kultury Milevsko',
            logo: 'https://improtresk.cz/static/logo-dk.png'
          }
        ]}
      />
    )
    expect(comp.find({ children: '2017' })).toHaveLength(0)
  })

  it('renders with current year', () => {
    const comp = shallow(
      <Footer
        currentYear={{
          year: '2017'
        }}
        partners={[]}
      />
    )
    expect(comp.find({ children: '2017' })).toHaveLength(1)
  })

  it('renders link to facebbok', () => {
    const comp = shallow(<Footer partners={[]} />)
    expect(comp.find('[href="https://fb.com/improtresk/"]')).toHaveLength(1)
  })

  it('renders link to twitter', () => {
    const comp = shallow(<Footer partners={[]} />)
    expect(comp.find('[href="https://twitter.com/hashtag/improtresk"]')).toHaveLength(1)
  })

  it('renders link to start navigation', () => {
    const comp = shallow(<Footer partners={[]} />)
    expect(comp.find('[href="https://maps.google.com/?daddr=Nádražní+846,+399+01+Milevsko"]')).toHaveLength(1)
  })

  it('renders link to support', () => {
    const comp = shallow(<Footer partners={[]} />)
    expect(comp.find('[href="mailto:info@improtresk.cz"]')).toHaveLength(1)
  })

  it('renders link to phone support', () => {
    const comp = shallow(<Footer partners={[]} />)
    expect(comp.find('[href="tel:+420 728 376 440"]')).toHaveLength(1)
  })
})
