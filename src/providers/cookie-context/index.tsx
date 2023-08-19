import * as React from 'react'
import reducer, { initial_state } from './reducer'
import { ContextProps } from './types'

export const CookieStore = React.createContext({} as ContextProps)

export const CookieStoreProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = React.useReducer(reducer, initial_state)

  return (
    <CookieStore.Provider value={{ state, dispatch }}>
      {props.children}
    </CookieStore.Provider>
  )
}
