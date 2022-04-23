import { act } from '@testing-library/react'
import React, { Component, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

import { connect, useDispatch, useSelector } from 'react-redux'
import * as loginActions from './../../actions/login.action'

export default function Login(props) {
  const [account, setAccount] = useState({
    username: 'admin',
    password: '1234',
  })

  const loginReducer = useSelector(({ loginReducer }) => loginReducer)
  const dispatch = useDispatch()

  // componentDidMount() {
  //   this.props.autoLogin(this.props.history)
  // }

  const showError = () => {
    return (
      <div className="alert alert-danger alert-dismissible">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        >
          ×
        </button>
        <h4>
          <i className="icon fa fa-ban" /> Alert!
        </h4>
        Incorrect username or password
      </div>
    )
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="login-logo">
            <b>เข้าสู่ระบบ</b>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">ใส่ชื่อและรหัสผ่านเพื่อใช้งานระบบ</p>
              <form>
                <div className="form-group has-feedback">
                  <input
                    onChange={(e) =>
                      setAccount({ ...account, username: e.target.value })
                    }
                    type="email"
                    name={account.username}
                    className="form-control"
                    placeholder="Email"
                  />
                  <span className="glyphicon glyphicon-envelope form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                    type="password"
                    name={account.password}
                    className="form-control"
                    placeholder="Password"
                  />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>

                {loginReducer.isError ? this.showError() : null}

                {/* Login */}
                {/* /.col */}
                <div className="col-xs-12">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      dispatch(loginActions.login({ ...account, ...props }))
                    }}
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    เข้าสู่ระบบ
                  </button>
                  {/* /.col */}
                </div>
                {/* Register */}
                {/* /.col */}
                <div className="col-xs-12">
                  <button
                    onClick={() => props.history.push('/register')}
                    type="submit"
                    style={{ marginTop: 8 }}
                    className="btn btn-block btn-default"
                  >
                    ลงทะเบียน
                  </button>
                  {/* /.col */}
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /.login-box-body */}
      </div>
    </div>
  )
}
