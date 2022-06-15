import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as loginActions from '../../actions/login.action'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Menu = (props) => {
  const { pathname } = props.location

  const loginReducer = useSelector(({ loginReducer }) => loginReducer)
  const dispatch = useDispatch()

  const { result } = loginReducer

  const AdminView = () => {
    return (
      <li className="nav-item">
        <div
          className={
            pathname == '/user' ? 'nav-link bg-info active' : 'nav-link'
          }
        >
          <Link to="/user">
            <i className="far fa-circle nav-icon" />
            <p>ผู้ใช้งาน</p>
          </Link>
        </div>
      </li>
    )
  }

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <div className="brand-link">
          <Link to="/">
            <img
              src="images/pen.png"
              alt="Logchain icon"
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
                // src="images/admin.png"
                src={'images/' + result.roleId + '.png'}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <Link to="/" className="d-block">
                {result.username}
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
                  <i className="nav-icon fas fa-th" />
                  <p style={{ marginLeft: 5 }}>
                    แสดงผลห่วงโซ่บล็อก
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {/* <li className="nav-item ">
                    <div
                      className={
                        pathname == '/dashboard'
                          ? 'nav-link bg-info active'
                          : 'nav-link'
                      }
                    >
                      <Link to="/dashboard">
                        <i className="far fa-circle nav-icon" />
                        <p>แดสบอร์ด</p>
                      </Link>
                    </div>
                  </li> */}
                  <li className="nav-item">
                    <div
                      className={
                        pathname == '/logchain'
                          ? 'nav-link bg-info active'
                          : 'nav-link'
                      }
                    >
                      <Link to="/logchain">
                        <i className="far fa-circle nav-icon" />
                        <p>บันทึกการใช้งาน</p>
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        pathname == '/blockview'
                          ? 'nav-link bg-info active'
                          : 'nav-link'
                      }
                    >
                      <Link to="/blockview">
                        <i className="far fa-circle nav-icon" />
                        <p>ห่วงโซ่บล็อก</p>
                      </Link>
                    </div>
                  </li>

                  {/* <li className="nav-item">
                    <div
                      className={
                        pathname == '/report' ? 'nav-link bg-info active' : 'nav-link'
                      }
                    >
                      <Link to="/report">
                        <i className="far fa-circle nav-icon" />
                        <p>Report</p>
                      </Link>
                    </div>
                  </li> */}
                </ul>
              </li>

              <li className="nav-item menu-open">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p style={{ marginLeft: 5 }}>
                    จัดการระบบ
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {result.roleId === 1 ? AdminView() : null}

                  {/* <li className="nav-item">
                    <div
                      className={
                        pathname == '/report'
                          ? 'nav-link bg-info active'
                          : 'nav-link'
                      }
                    >
                      <Link to="/report">
                        <i className="far fa-circle nav-icon" />
                        <p>เกี่ยวกับบล็อก</p>
                      </Link>
                    </div>
                  </li> */}
                  <li className="nav-item">
                    <div
                      className={
                        pathname == '/report'
                          ? 'nav-link bg-info active'
                          : 'nav-link'
                      }
                    >
                      <Link to="/report">
                        <i className="far fa-circle nav-icon" />
                        <p>ทรัพยากรระบบ</p>
                      </Link>
                    </div>
                  </li>
                  {/* <li className="nav-item">
                    <div
                      className={
                        pathname == '/login' ? 'nav-link bg-info active' : 'nav-link'
                      }
                    >
                      <Link
                        to="/login"
                        onClick={() => {
                          dispatch(loginActions.logout({ ...props }))
                        }}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>ออกจากระบบ</p>
                      </Link>
                    </div>
                  </li> */}
                  <li className="nav-item">
                    <div
                      className={
                        pathname == '/login'
                          ? 'nav-link bg-info active'
                          : 'nav-link'
                      }
                    >
                      <Link
                        to={pathname}
                        onClick={() => {
                          // dispatch(loginActions.logout({ ...props }))
                          MySwal.fire({
                            title: 'ยืนยันการออกจากระบบ',
                            text: 'กรุณายืนยันเพื่อเป็นการออกจากระบบ',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'ยืนยัน',
                            cancelButtonText: 'ยกเลิก',
                          }).then((result) => {
                            if (result.value) {
                              // this.props.deleteProduct(item.id)
                              dispatch(loginActions.logout({ ...props }))
                            }
                          })
                        }}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>ออกจากระบบ</p>
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
