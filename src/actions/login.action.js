import {
  HTTP_LOGIN_FAILED,
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  LOGIN_STATUS,
  server,
  YES,
  HTTP_LOGOUT,
  OK,
} from '../constants'

import { httpClient } from '../utils/HttpClient'

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

export const autoLogin = (history) => {
  return () => {
    if (localStorage.getItem(server.LOGIN_PASSED) == YES) {
      setTimeout(() => history.push('/logchain'), 100)
    }
  }
}

export const reLogin = () => {
  return (dispatch) => {
    const loginStatus = localStorage.getItem(LOGIN_STATUS)
    if (loginStatus == 'ok') {
      dispatch(setLoginStateToSuccess({}))
    }
  }
}

export const isLoggedIn = () => {
  const loginStatus = localStorage.getItem(LOGIN_STATUS)
  return loginStatus == 'ok'
}

export const login = ({ username, password, history }) => {
  return async (dispatch) => {
    dispatch(setLoginStateToFetching())
    const result = await httpClient.post(server.LOGIN_URL, {
      username,
      password,
    })
    if (result.data.result == 'ok') {
      localStorage.setItem(LOGIN_STATUS, 'ok')
      dispatch(setLoginStateToSuccess('ok'))
      history.push('/blockview')
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

    dispatch(setLoginStateToLogout())
    history.push('/')
  }
}
