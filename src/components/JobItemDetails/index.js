import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobsItemList: {},
    apiStatus: apiStatusConstants.initial,
    similarJobItemList: [],
  }

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedSkillsData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    title: data.title,
    rating: data.rating,
    skills: data.skills.map(eachSkill => ({
      image: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = this.getFormattedData(data.job_details)

      const updatedSkillData = data.similar_jobs.map(eachItem =>
        this.getFormattedSkillsData(eachItem),
      )

      this.setState({
        jobsItemList: updatedData,
        similarJobItemList: updatedSkillData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetails = () => {
    const {jobsItemList, similarJobItemList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobsItemList

    return (
      <div className="job-item-full-details-container">
        <div className="job-items-container">
          <div className="title-logo-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="two-divs">
              <div className="location-work-container">
                <GoLocation className="location-logo" />
                <p className="location">{location}</p>
              </div>
              <div className="location-work-container">
                <BsBriefcaseFill className="location-logo-brief" />
                <p className="location">{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-link-container">
            <div className="description-container">
              <h1 className="description">Description</h1>
              <a href={companyWebsiteUrl} className="anchor-link">
                Visit
                <BiLinkExternal className="bi-link" />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        {this.renderSimilarJobItem()}
      </div>
    )
  }

  renderSimilarJobItem = () => {
    const {similarJobItemList} = this.state
    console.log(similarJobItemList)
    return (
      <ul className="similar-cards">
        {similarJobItemList.map(eachItem => (
          <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="jobs-failureView-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-para">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        testid="button"
        className="job-item-failure-button"
        onClick={this.getJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="get-product-jobs-container">
          {this.renderJobViews()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
