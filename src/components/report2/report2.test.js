import React from 'react'
import { shallow } from 'enzyme'
import Report2 from './report3'

describe('Report2', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Report2 />)
    expect(wrapper).toMatchSnapshot()
  })
})
