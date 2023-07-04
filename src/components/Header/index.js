import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const clickLoginBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="logo"
      />
      <button type="button" className="logout-btn" onClick={clickLoginBtn}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
