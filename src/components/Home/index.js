import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-text-content">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs It is a long established
          fact that a reader will be distracted by the readable content of a
          page when looking at its layout. The point of using Lorem Ipsum is
          that it has a more-or-less normal distribution of letters
        </p>
        <Link to="/jobs">
          <button className="home-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
