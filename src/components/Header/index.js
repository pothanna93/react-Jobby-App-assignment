import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-content-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-header-logo"
          />
        </Link>
        <ul className="home-logout-icons">
          <Link to="/">
            <li>
              <AiFillHome className="home-icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <MdWork className="home-icon" />
            </li>
          </Link>
          <button
            className="mobile-logout-btn"
            type="button"
            onClick={onClickLogout}
          >
            <FiLogOut className="home-icon" />
          </button>
        </ul>
        <div className="large-mode-container">
          <ul className="home-job-container">
            <Link to="/">
              <li className="home-btn">Home</li>
            </Link>
            <Link to="/jobs">
              <li className="home-btn">Jobs</li>
            </Link>
          </ul>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
