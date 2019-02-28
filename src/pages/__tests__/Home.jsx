import React from 'react'

import Home from '../Home'

import { renderContainer } from '../../../mock/containers'

describe('Home page', () => {
  let comp

  beforeEach(() => {
    const state = {
      years: {
        list: {
          data: [
            {
              id: 150,
              current: true,
              topic: 'foo',
              year: '2019',
              startDate: '2019-05-04',
              endDate: '2019-05-09'
            }
          ],
          valid: true
        }
      }
    }
    comp = renderContainer(<Home />, state)
  })

  it('provides active year', () => {
    expect(comp.find('Home')).toHaveProp('year', {
      id: 150,
      current: true,
      topic: 'foo',
      year: '2019',
      startDate: '2019-05-04',
      endDate: '2019-05-09'
    })
  })
})
