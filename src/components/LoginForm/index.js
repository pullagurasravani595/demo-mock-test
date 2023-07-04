import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {UserID: '', PIN: '', showError: false, errorMsg: ''}

  changeUserID = event => {
    this.setState({UserID: parseInt(event.target.value)})
  }

  changePin = event => {
    this.setState({PIN: parseInt(event.target.value)})
  }

  loginFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  clickSubmitForm = async event => {
    event.preventDefault()
    const {UserID, PIN} = this.state
    const userLoginDetails = {UserID, PIN}
    const options = {
      method: 'POST',
      body: JSON.stringify(userLoginDetails),
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      return this.submitSuccess(data.jwt_token)
    }
    return this.loginFailure(data.error_msg)
  }

  render() {
    const {UserID, PIN, errorMsg, showError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <form className="form-container" onSubmit={this.clickSubmitForm}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-label-container">
              <label htmlFor="user" className="user">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter User Id"
                id="user"
                className="input"
                onChange={this.changeUserID}
                value={UserID}
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="pin" className="user">
                PIN
              </label>
              <input
                type="password"
                placeholder="Enter pin"
                id="pin"
                className="input"
                onChange={this.changePin}
                value={PIN}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showError && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
