import {
  HTTP_LOGIN_FAILED,
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  server,
  YES,
  HTTP_LOGOUT,
  LOGIN_STATUS,
  TOKEN,
  OK,
} from '../constants'

import { httpClient } from '../utils/HttpClient'
import jwtDecode from 'jwt-decode'

export const setLoginStateToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
})

export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
})

export const setLoginStateToFailed = (payload) => ({
  type: HTTP_LOGIN_FAILED,
  payload,
})

export const setLoginStateToLogout = () => ({
  type: HTTP_LOGOUT,
})

export const reLogin = () => {
  return (dispatch) => {
    const loginStatus = localStorage.getItem(LOGIN_STATUS)
    console.log('LoginStatus: ', loginStatus)
    let userToken = localStorage.getItem(TOKEN)
    console.log('userToken: ', userToken)
    if (userToken) {
      const userToken_decoded = jwtDecode(userToken)
      console.log('User Token Decoded: ', userToken_decoded)
      var { username, roleId } = userToken_decoded
    }
    if (loginStatus == 'ok') {
      // dispatch(setLoginStateToSuccess({}))
      dispatch(setLoginStateToSuccess({ status: 'ok', username, roleId }))
    }
  }
}

export const isLoggedIn = () => {
  const loginStatus = localStorage.getItem(LOGIN_STATUS)
  //return true or false
  return loginStatus == 'ok'
}

export const login = ({ username, password, history }) => {
  return async (dispatch) => {
    dispatch(setLoginStateToFetching())
    console.log('User: ', username)
    // console.log('History: ', history)
    const result = await httpClient.post(server.LOGIN_URL, {
      username,
      password,
    })
    if (result.data.result == 'ok') {
      localStorage.setItem(LOGIN_STATUS, 'ok')
      localStorage.setItem(TOKEN, result.data.token)
      let userToken = result.data.token
      if (userToken) {
        let userToken_decoded = jwtDecode(userToken)
        console.log('User Token Decoded: ', userToken_decoded)
        var { roleId } = userToken_decoded
      }
      dispatch(
        // setLoginStateToSuccess({ status: 'ok', token: result.data.token }),
        // setLoginStateToSuccess('ok'),
        setLoginStateToSuccess({ status: 'ok', username, roleId }),
      )
      history.push('/logchain')
      // alert(JSON.stringify(result.data));
    } else {
      localStorage.setItem(LOGIN_STATUS, 'nok')
      dispatch(setLoginStateToFailed(result.data.message))
    }
  }
}

export const logout = ({ history }) => {
  return (dispatch) => {
    localStorage.removeItem(LOGIN_STATUS)
    localStorage.removeItem(TOKEN)
    dispatch(setLoginStateToLogout())
    history.push('/')
  }
}
