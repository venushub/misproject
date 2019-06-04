import React from 'react'
import { Link , NavLink} from 'react-router-dom'

const Home = () => {
  return(
    <div className="home-main-container">
      <div className="home-header">
        <div className="home-header-title">MAPI</div>
        <div className="home-nav">
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
        </div>
      </div>
      <div className="home-info">
        <div className="home-info-content"></div>
        <div className="home-info-content-top">
          <div className="home-info-content-ac">
            <ul>
              <li className="home-info-li">Activity Logging</li>
              <li className="home-info-li">Dashboard</li>
              <li className="home-info-li">MIS Reports</li>
            </ul>
          </div>
          <div className="home-info-pac">
            <img className="pacman" src={require('../images/pacman.png')}  />
            <img className="coffee" src={require('../images/coffee.png')}  />
            <img className="coffee" src={require('../images/coffee.png')}  />
            <img className="coffee" src={require('../images/coffee.png')}  />
            <div></div>
          </div>
        </div>
        <div className="home-footer"><div>Productivity at Scale</div></div>
      </div>
    </div>
  )
}

export default Home
