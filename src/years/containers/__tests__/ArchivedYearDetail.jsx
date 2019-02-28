import React from 'react'

import ArchivedYearDetail from '../ArchivedYearDetail'

import { yearDetailFetch } from '../../actions'
import { renderContainer } from '../../../../mock/containers'

describe('ArchivedYearDetail container', () => {
  let comp

  beforeEach(() => {
    const state = {
      years: {
        archive: {
          valid: true,
          data: {
            id: 20,
            createdAt: '2017-03-05T00:00:00',
            name: 'lunch',
            topic: 'Sladíme se společně',
            lang: 'cs',
            year: '2018'
          }
        }
      }
    }
    comp = renderContainer(<ArchivedYearDetail resourceId='2018' />, state)
  })

  it('provides translate method', () => {
    expect(comp.find('ArchivedYearDetail')).toHaveProp('translate')
  })

  it('provides year number', () => {
    expect(comp.find('ArchivedYearDetail')).toHaveProp('year', '2018')
  })

  it('provides year topic', () => {
    expect(comp.find('ArchivedYearDetail')).toHaveProp('topic', 'Sladíme se společně')
  })

  it('provides year workshops', () => {
    expect(comp.find('ArchivedYearDetail')).toHaveProp('workshops', [])
  })

  it('dispatches year detail required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(yearDetailFetch('2018'))
  })
})
