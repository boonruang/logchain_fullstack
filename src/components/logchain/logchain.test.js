import React from 'react'
import { shallow } from 'enzyme'
import Logchain from './logchain'

describe('Stock', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Logchain />)
    expect(wrapper).toMatchSnapshot()
  })
})
