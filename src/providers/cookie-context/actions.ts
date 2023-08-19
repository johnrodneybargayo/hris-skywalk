import { ActionTypes } from './types'

export const eraseCookie = (key: string) => {
  return { type: ActionTypes.ERASE_COOKIES, key }
}

export const retrieveCookie = (key: string) => {
  return { type: ActionTypes.GET_COOKIE, key }
}

export const saveCookie = (key: string, value: string) => {
  return { type: ActionTypes.SET_COOKIE, key, value }
}
