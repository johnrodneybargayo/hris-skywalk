import { eraseCookie, retrieveCookie, saveCookie } from '../actions'
import { ActionTypes } from '../types'

describe('eraseCookie', () => {
  it('should dispatch ERASE_COOKIES action', () => {
    const actual = {
      type: ActionTypes.ERASE_COOKIES,
      key: 'kasl-key',
    }

    expect(actual).toEqual(eraseCookie('kasl-key'))
  })
})

describe('retrieveCookie', () => {
  it('should dispatch GET_COOKIE action', () => {
    const actual = {
      type: ActionTypes.GET_COOKIE,
      key: 'kasl-key',
    }

    expect(actual).toEqual(retrieveCookie('kasl-key'))
  })
})

describe('retrieveCookie', () => {
  it('should dispatch SET_COOKIE action', () => {
    const actual = {
      type: ActionTypes.SET_COOKIE,
      key: 'kasl-key',
      value: 'testing',
    }

    expect(actual).toEqual(saveCookie('kasl-key', 'testing'))
  })
})
