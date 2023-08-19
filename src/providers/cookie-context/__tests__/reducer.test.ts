import reducer, { initial_state } from '../reducer'
import { ActionTypes } from '../types'

describe('reducer', () => {
  it('should start with blank kasl-key', () => {
    const expected = {
      'kasl-key': '',
    }

    expect(reducer(undefined, { type: undefined })).toEqual(expected)
  })

  it('should be able to get cookie', () => {
    document.cookie = 'kasl-key=testing; '

    const expected = {
      'kasl-key': 'testing',
    }
    expect(
      reducer(initial_state, { type: ActionTypes.GET_COOKIE, key: 'kasl-key' }),
    ).toEqual(expected)
  })

  it('should be able to erase cookie', () => {
    document.cookie = 'kasl-key=testing; '

    const expected = {
      'kasl-key': '',
    }
    expect(
      reducer(initial_state, {
        type: ActionTypes.ERASE_COOKIES,
        key: 'kasl-key',
      }),
    ).toEqual(expected)
  })

  it('should be able to set cookie', () => {
    const expected = {
      'kasl-key': 'testing',
    }
    expect(
      reducer(initial_state, {
        type: ActionTypes.SET_COOKIE,
        key: 'kasl-key',
        value: 'testing',
      }),
    ).toEqual(expected)
  })
})
