import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="notFound-container">
    <Header />
    <div className="notfound-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-description">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
