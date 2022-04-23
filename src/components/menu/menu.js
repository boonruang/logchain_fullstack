import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as loginActions from '../../actions/login.action'
import { useDispatch } from 'react-redux'

const Menu = (props) => {
  const { pathname } = props.location
  const dispatch = useDispatch()

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <div className="brand-link">
          <Link to="/">
            <img
              src="images/pen.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: '.8' }}
            />
            <span className="brand-text font-weight-light">LOGING CHAIN</span>
          </Link>
        </div>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <Link to="/" className="d-block">
                System Admin
              </Link>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item ">
                    <div
                      className={
                        pathname == '/dashboard'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      <Link to="/dashboard">
                        <i className="far fa-circle nav-icon" />
                        <p>แดสบอร์ด</p>
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        pathname == '/logchain' ? 'nav-link active' : 'nav-link'
                      }
                    >
                      <Link to="/logchain">
                        <i className="far fa-circle nav-icon" />
                        <p>การเข้าใช้งาน</p>
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        pathname == '/blockview'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      <Link to="/blockview">
                        <i className="far fa-circle nav-icon" />
                        <p>Blockview</p>
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        pathname == '/report' ? 'nav-link active' : 'nav-link'
                      }
                    >
                      <Link to="/report">
                        <i className="far fa-circle nav-icon" />
                        <p>Report</p>
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        pathname == '/login' ? 'nav-link active' : 'nav-link'
                      }
                    >
                      <Link
                        to="/login"
                        onClick={() => {
                          dispatch(loginActions.logout({ ...props }))
                        }}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Logout</p>
                      </Link>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  )
}
export default withRouter(Menu)
