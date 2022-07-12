import './index.css'

const JobFilterGroup = props => {
  const renderEmployBasedOnSalary = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachSalary => {
      const {changeSalaryRange} = props
      const onChangeSalary = () => {
        changeSalaryRange(eachSalary.salaryRangeId)
      }
      return (
        <li className="employ-item" key={eachSalary.salaryRangeId}>
          <input
            type="radio"
            name="salary"
            id={eachSalary.salaryRangeId}
            onChange={onChangeSalary}
            className="check-box"
          />
          <label className="label-item" htmlFor={eachSalary.salaryRangeId}>
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="type-employ-container">
      <h1 className="type-employ-heading">Salary Range</h1>
      <ul className="employ-lists">{renderEmployBasedOnSalary()}</ul>
    </div>
  )

  const renderEmploymentItem = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachItem => {
      const {changeEmploymentType} = props
      const onChangeEmployType = event => {
        changeEmploymentType(event.target.value)
      }

      return (
        <li key={eachItem.employmentTypeId} className="employ-item">
          <input
            type="checkbox"
            className="check-box"
            onChange={onChangeEmployType}
            id={eachItem.employmentTypeId}
            value={eachItem.employmentTypeId}
          />
          <label className="label-item" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const renderTypeOfEmployment = () => (
    <div className="type-employ-container">
      <h1 className="type-employ-heading">Type Of Employment</h1>
      <ul className="employ-lists">{renderEmploymentItem()}</ul>
    </div>
  )

  return (
    <div className="job-filter-container">
      {renderTypeOfEmployment()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}
export default JobFilterGroup
