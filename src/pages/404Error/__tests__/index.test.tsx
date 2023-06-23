import { shallow } from 'enzyme'
import * as React from 'react'
import { Page404Error } from '../'

describe('404 Page', () => {
  it('should render as expected', () => {
    const comp = shallow(<Page404Error />)
    expect(comp.find('.title')).toHaveLength(1)
  })
})
