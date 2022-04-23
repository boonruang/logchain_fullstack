import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from './../../actions/register.action'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
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
        Incorrect information!
      </div>
    )
  }

  render() {
    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="login-logo">
              <b>ลงทะเบียน</b>
            </div>
            {/* /.login-logo */}
            <div className="card">
              <div
                style={{ background: 'whitesmoke', borderRadius: '10' }}
                className="card-body login-card-body"
              >
                <p className="login-box-msg">ใส่ข้อมูลเพื่อลงทะเบียน</p>
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

                  {/* Ternary condition */}
                  {this.props.registerReducer.isError ? this.showError() : null}

                  {/* Register */}
                  {/* /.col */}
                  <div className="col-xs-12">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        this.props.register(this.props.history, this.state)
                      }}
                      type="submit"
                      className="btn btn-primary btn-block btn-flat"
                    >
                      Register
                    </button>
                  </div>
                  {/* /.col */}
                  {/* Cancel */}
                  {/* /.col */}
                  <div className="col-xs-12">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        this.props.history.goBack()
                      }}
                      style={{ marginTop: 8 }}
                      className="btn btn-block btn-default"
                    >
                      Cancel
                    </button>
                  </div>
                  {/* /.col */}
                </form>
              </div>
            </div>
          </div>
          {/* /.login-box-body */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ registerReducer }) => ({
  registerReducer,
})

const mapDispatchToProps = {
  register,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
