import sinon from 'sinon'
import React from 'react'

import { shallow } from 'enzyme'

import FoodPickerItem from '../FoodPickerItem'

describe('FoodPickerItem component', () => {
  it('renders soups as radio group', () => {
    const comp = shallow(
      <FoodPickerItem
        id={10}
        name='lunch'
        food={[]}
        soups={[
          {
            id: 11,
            name: 'Květáková'
          }
        ]}
        orderedSoup={11}
        date='2018-05-11'
        onChange={() => {}}
      />
    )
    expect(comp.find('InputRadioGroup').at(0)).toHaveProp('value', 11)
    expect(comp.find('InputRadioGroup').at(0)).toHaveProp('options', [
      {
        id: 11,
        name: 'Květáková'
      }
    ])
  })

  it('renders food as radio group', () => {
    const comp = shallow(
      <FoodPickerItem
        id={10}
        name='lunch'
        food={[
          {
            id: 11,
            name: 'Řízek'
          }
        ]}
        soups={[]}
        orderedFood={11}
        date='2018-05-11'
        onChange={() => {}}
      />
    )
    expect(comp.find('InputRadioGroup').at(1)).toHaveProp('value', 11)
    expect(comp.find('InputRadioGroup').at(1)).toHaveProp('options', [
      {
        id: 11,
        name: 'Řízek'
      }
    ])
  })

  it('triggers onChange with soup on soup change', () => {
    const onChange = sinon.spy()
    const comp = shallow(
      <FoodPickerItem
        id={10}
        name='lunch'
        food={[]}
        soups={[]}
        orderedFood={11}
        date='2018-05-11'
        onChange={onChange}
      />
    )
    comp.find('InputRadioGroup').at(0).simulate('change', 'soup', 15)
    expect(onChange.getCall(0).args).toEqual([
      10,
      {
        soup: 15,
        food: 11
      }
    ])
  })

  it('triggers onChange with food on food change', () => {
    const onChange = sinon.spy()
    const comp = shallow(
      <FoodPickerItem
        id={10}
        name='lunch'
        food={[]}
        soups={[]}
        orderedSoup={15}
        date='2018-05-11'
        onChange={onChange}
      />
    )
    comp.find('InputRadioGroup').at(1).simulate('change', 'food', 11)
    expect(onChange.getCall(0).args).toEqual([
      10,
      {
        soup: 15,
        food: 11
      }
    ])
  })
})
