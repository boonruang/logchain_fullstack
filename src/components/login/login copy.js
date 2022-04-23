import React, { Component } from 'react'

import { connect } from 'react-redux'
import { login, autoLogin } from './../../actions/login.action'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    this.props.autoLogin(this.props.history)
  }

  showError = () => {
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

  render() {
    return (
      <div class="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <b>CMStock</b>Login
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <form>
                <div className="form-group has-feedback">
                  <input
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    type="email"
                    name="username"
                    className="form-control"
                    placeholder="Email"
                  />
                  <span className="glyphicon glyphicon-envelope form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                  <input
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>

                {this.props.loginReducer.isError ? this.showError() : null}

                {/* Login */}
                <div className="row">
                  {/* /.col */}
                  <div className="col-xs-12">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        this.props.login(this.props.history, this.state)
                      }}
                      type="submit"
                      className="btn btn-primary btn-block btn-flat"
                    >
                      Sign In
                    </button>
                  </div>
                  {/* /.col */}
                </div>
                {/* Register */}
                <div className="row">
                  {/* /.col */}
                  <div className="col-xs-12">
                    <button
                      onClick={() => this.props.history.push('/register')}
                      type="submit"
                      style={{ marginTop: 8 }}
                      className="btn btn-block btn-default"
                    >
                      Register
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /.login-box-body */}
      </div>
    )
  }
}

const mapStateToProps = ({ loginReducer }) => ({ loginReducer })

const mapDispatchToProps = {
  login,
  autoLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
