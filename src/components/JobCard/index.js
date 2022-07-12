import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {MdWork} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-list-item">
        <div className="job-item-container">
          <div className="logo-rating-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-star-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-star-container">
                <AiFillStar className="star-icon" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="location-icons-container">
              <div className="location-container">
                <GoLocation className="job-icons" />
                <p className="job-location">{location}</p>
              </div>
              <div className="location-type-of-work">
                <MdWork className="job-icons" />
                <p className="job-location">{employmentType}</p>
              </div>
            </div>
            <p className="job-location">{packagePerAnnum}</p>
          </div>
          <hr />
          <h1 className="job-description">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
