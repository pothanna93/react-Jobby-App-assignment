import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-element">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          onChange={this.onChangeUsername}
          value={username}
          className="input-element"
          placeholder="Username"
        />
      </>
    )
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label-element">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          onChange={this.onChangePassword}
          value={password}
          className="input-element"
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt=" website logo"
            className="website-logo"
          />
          <form className="from-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUserName()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
