import { Dispatch } from 'react'
import { AnyAction } from 'redux'

export enum ActionTypes {
  GET_COOKIE = 'GET_COOKIE',
  SET_COOKIE = 'SET_COOKIE',
  ERASE_COOKIES = 'ERASE_COOKIES',
}

export interface StateProps {
  [key: string]: string
}

export interface ContextProps {
  state: StateProps
  dispatch: Dispatch<AnyAction>
}
