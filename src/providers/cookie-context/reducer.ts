import { AnyAction } from 'redux'
import { ActionTypes } from './types'
import { getCookie, eraseCookie, setCookie } from '../../components/Utils/cookieUtils'

export const initial_state = {
  'kasl-key': '',
}

export const reducer = (state = initial_state, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.GET_COOKIE:
      return {
        ...state,
        [action.key]: getCookie(action.key),
      }
    case ActionTypes.ERASE_COOKIES:
      eraseCookie(action.key)
      return {
        ...state,
        [action.key]: '',
      }
    case ActionTypes.SET_COOKIE:
      setCookie(action.key, action.value)
      return {
        ...state,
        [action.key]: getCookie(action.key),
      }
    default:
      return state
  }
}

export default reducer
