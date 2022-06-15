import React from 'react'
import { shallow } from 'enzyme'
import Report from './report'

describe('Report', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Report />)
    expect(wrapper).toMatchSnapshot()
  })
})
