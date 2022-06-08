import React, { useEffect } from 'react'
import Header from './components/header'
import Menu from './components/menu'
import Footer from './components/footer'
import Login from './components/login'
import Logchain from './components/logchain'
import Register from './components/register/register'
import UserCreate from './components/userCreate'
import UserEdit from './components/userEdit'
import Dashboard from './components/dashboard'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Report from './components/report'
import Blockdata from './components/blockdata'
import Blockview from './components/blockview'
import User from './components/user'
import * as loginActions from './actions/login.action'

const SecureRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loginActions.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loginActions.isLoggedIn() ? (
        <Redirect to="/blockview" />
      ) : (
        <Login {...props} />
      )
    }
  />
)

export default function App() {
  const loginReducer = useSelector(({ loginReducer }) => loginReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('App Created')
    dispatch(loginActions.reLogin())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <div>
        {loginReducer.result && !loginReducer.isError && <Header />}
        {loginReducer.result && !loginReducer.isError && <Menu />}
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <SecureRoute path="/logchain" component={Logchain} />
          <SecureRoute path="/blockview" component={Blockview} />
          <SecureRoute path="/user" component={User} />
          <SecureRoute path="/user-create" component={UserCreate} />
          <SecureRoute path="/dashboard" component={Dashboard} />
          <SecureRoute path="/blockdata/:blockid" component={Blockdata} />
          <SecureRoute path="/user-edit/:id" component={UserEdit} />
          <Route
            exact={true}
            path="/"
            component={() => <Redirect to="/login" />}
          />
          <Route
            path="*"
            exact={true}
            component={() => <Redirect to="/login" />}
          />
        </Switch>
        {loginReducer.result && !loginReducer.isError && <Footer />}
      </div>
    </Router>
  )
}
