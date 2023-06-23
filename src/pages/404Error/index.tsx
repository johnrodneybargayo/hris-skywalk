import * as React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

interface Props {
  in_progress?: boolean
}

export const Page404Error = (props: Props) => {
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-1">404 Error</h1>
          <h2 className="subtitle is-3">Page not found</h2>
          <img
          className="error404"
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*oTOmPQFJQSOHrYHWnxytgA.png"
          alt="Logo"
        />
          <Link className='home' to="/sign-in">Go home &rarr;</Link>
        </div>
      </div>
    </section>
  )
}
