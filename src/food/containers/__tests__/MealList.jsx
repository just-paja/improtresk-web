import React from 'react'

import { mealListFetch } from '../../actions'

import MealList from '../MealList'

import { renderContainer } from '../../../../mock/containers'

describe('MealList container', () => {
  let comp

  beforeEach(() => {
    const state = {
      food: {
        list: {
          valid: true,
          data: [
            {
              id: 20,
              date: '2017-03-05',
              name: 'lunch',
              soups: [],
              food: []
            }
          ]
        }
      }
    }
    comp = renderContainer(<MealList to='foo' />, state)
  })

  it('provides list of meals', () => {
    expect(comp.find('MealList')).toHaveProp('mealList', [
      {
        id: 20,
        date: '2017-03-05',
        name: 'lunch',
        soups: [],
        food: []
      }
    ])
  })

  it('dispatches meals required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: mealListFetch.TRIGGER
    }))
  })
})
