import React from 'react'

import { shallow } from 'enzyme'

import PermaLink from '../PermaLink'

describe('Permanent link generator component', () => {
  it('renders link with preescaped title', () => {
    const comp = shallow(
      <PermaLink
        id={23}
        title='news-item-title'
        to='newsDetail'
      >
        23. 2. 2016
      </PermaLink>
    )
    expect(comp.find('Connect(Link)')).toHaveProp('params', { slug: 'news-item-title-23' })
  })

  it('renders link with english title', () => {
    const comp = shallow(
      <PermaLink
        id={23}
        title='News Item Title'
        to='newsDetail'
      >
        23. 2. 2016
      </PermaLink>
    )
    expect(comp.find('Connect(Link)')).toHaveProp('params', {
      slug: 'news-item-title-23'
    })
  })

  it('renders link with czech title', () => {
    const comp = shallow(
      <PermaLink
        id={23}
        title='Přespříliš žluťoučký kůň úpěl ďábelské ódy'
        to='newsDetail'
      >
        23. 2. 2016
      </PermaLink>
    )
    expect(comp.find('Connect(Link)')).toHaveProp('params', {
      slug: 'presprilis-zlutoucky-kun-upel-dabelske-ody-23'
    })
  })

  it('renders link with multiple dashes in title', () => {
    const comp = shallow(
      <PermaLink
        id={23}
        title='Multiple  spaces   in--the---title'
        to='newsDetail'
      >
        23. 2. 2016
      </PermaLink>
    )
    expect(comp.find('Connect(Link)')).toHaveProp('params', {
      slug: 'multiple-spaces-in-the-title-23'
    })
  })

  it('renders link with too long title', () => {
    const comp = shallow(
      <PermaLink
        id={23}
        title='Improtřesk je český festival divadelní improvizace a největší setkání improvizátorů'
        to='newsDetail'
      >
        23. 2. 2016
      </PermaLink>
    )
    expect(comp.find('Connect(Link)')).toHaveProp('params', {
      slug: 'improtresk-je-cesky-festival-divadelni-improviza-23'
    })
  })

  it('does not fail when given no routeParams', () => {
    expect(() => {
      shallow(
        <PermaLink
          id={23}
          title='Improtřesk je český festival'
          to='newsDetail'
        >
          23. 2. 2016
        </PermaLink>
      )
    }).not.toThrow()
  })
})
