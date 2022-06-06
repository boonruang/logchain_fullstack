import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as loginActions from '../../actions/login.action'

const Header = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <div className="nav-link">
              <Link to="/">หน้าหลัก</Link>
            </div>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far ion-log-out" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
              onClick={() => dispatch(loginActions.logout({ ...props }))}
            >
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="far ion-android-hand mr-2" /> Logout
              </a>
            </div>
          </li> */}
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withRouter(Header)
