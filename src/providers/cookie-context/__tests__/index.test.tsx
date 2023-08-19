import * as React from 'react'
import { CookieStoreProvider, CookieStore } from '../'
import { render } from '@testing-library/react'
import { ActionTypes } from '../types'

const Example = () => {
  const cookie = React.useContext(CookieStore)

  React.useEffect(() => {
    return cookie.dispatch({ type: ActionTypes.GET_COOKIE, key: 'kasl-key' })
  }, [])

  return <div>{cookie.state['kasl-key']}</div>
}

describe('Cookie context provider', () => {
  it('should render DOM children', async () => {
    const { queryAllByText } = render(
      <CookieStoreProvider>
        <span>this is a test</span>
      </CookieStoreProvider>,
    )

    const actual = await queryAllByText(/this is a test/i)

    // await waitForElement(() => queryAllByText(/test is a test/i))
    expect(actual).toHaveLength(1)
  })

  it('should render cookie value', async () => {
    document.cookie = 'kasl-key=asdfasdf; '
    const { queryAllByText } = render(
      <CookieStoreProvider>
        <Example />
      </CookieStoreProvider>,
    )

    const actual = await queryAllByText(/asdfasdf/i)

    // await waitForElement(() => queryAllByText(/test is a test/i))
    expect(actual).toHaveLength(1)
  })
})
