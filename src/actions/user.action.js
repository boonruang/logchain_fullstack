import {
  HTTP_USER_FAILED,
  HTTP_USER_FETCHING,
  HTTP_USER_SUCCESS,
  HTTP_USERINFO_SUCCESS,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateUserToSuccess = (payload) => ({
  type: HTTP_USER_SUCCESS,
  payload,
})

const setStateUserToFetching = () => ({
  type: HTTP_USER_FETCHING,
})

const setStateUserToFailed = () => ({
  type: HTTP_USER_FAILED,
})

const setStateUserInfoToSuccess = (payload) => ({
  type: HTTP_USERINFO_SUCCESS,
  payload,
})

export const getUsers = () => {
  return (dispatch) => {
    dispatch(setStateUserToFetching())
    doGetUsers(dispatch)
  }
}

const doGetUsers = (dispatch) => {
  console.log('doGetUsers called')
  httpClient
    .get(`${server.USER_URL}/list`)
    .then((result) => {
      dispatch(setStateUserToSuccess(result.data.result))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateUserToFailed())
    })
}

export const getUserInfo = () => {
  return async (dispatch) => {
    await httpClient
      .get(`${server.USER_URL}/info`)
      .then((result) => {
        dispatch(setStateUserInfoToSuccess(result.data))
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }
}

export const deleteUserById = (id) => {
  return async (dispatch) => {
    dispatch(setStateUserToFetching())
    console.log(`deleteUserById id:${id} called`)
    await httpClient.delete(`${server.USER_URL}/${id}`)
    await doGetUsers(dispatch)
  }
}

export const addUser = (history, formData) => {
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.USER_URL, formData)
      console.log('addUser formData successfully: ', result)
      history.goBack()
    } catch (error) {
      // failed
      console.log('addUser formData Error: ', error.toString())
    }
  }
}
