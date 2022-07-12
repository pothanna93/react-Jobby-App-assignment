import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiSearch} from 'react-icons/bi'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import JobFilterGroup from '../JobFilterGroup'
import ProfileDetails from '../ProfileDetails'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobProfileSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput, employmentType, salaryRange} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiJobUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employmentType.join()}&minimum_package=${salaryRange}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiJobUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobsList} = this.state
    const displayJobs = jobsList.length > 0

    return displayJobs ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-job-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyEnter = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeEmploymentType = type => {
    this.setState(
      prev => ({employmentType: [...prev.employmentType, type]}),
      this.getJobDetails,
    )
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobDetails)
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-element"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
          onKeyDown={this.onKeyEnter}
        />
        <button
          className="search-btn"
          type="button"
          testid="searchButton"
          onClick={this.onKeyEnter}
        >
          <BiSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="job-profile-section-container">
        <div className="filter-container">
          <div className="search-input-mobile">{this.renderSearchInput()}</div>
          <ProfileDetails />
          <hr />
          <JobFilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeSearchInput={this.changeSearchInput}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
          />
        </div>
        <div>
          <div className="search-input-desktop">{this.renderSearchInput()}</div>

          {this.renderJobProfileDetailsList()}
        </div>
      </div>
    )
  }
}
export default JobProfileSection
