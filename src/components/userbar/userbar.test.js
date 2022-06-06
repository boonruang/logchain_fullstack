import React from 'react'
import { shallow } from 'enzyme'
import Userbar from './userbar'

describe('Userbar', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Userbar />)
    expect(wrapper).toMatchSnapshot()
  })
})
