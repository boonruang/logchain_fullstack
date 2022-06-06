import {
  HTTP_USER_FAILED,
  HTTP_USER_FETCHING,
  HTTP_USER_SUCCESS,
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

export const getUsers = () => {
  return (dispatch) => {
    dispatch(setStateUserToFetching())
    doGetUsers(dispatch)
  }
}

const doGetUsers = (dispatch) => {
  httpClient
    .get(server.USER_URL)
    .then((result) => {
      dispatch(setStateUserToSuccess(result.data.result))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateUserToFailed())
    })
}
