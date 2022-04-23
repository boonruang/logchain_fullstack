import {
  HTTP_SYSTEM_FAILED,
  HTTP_SYSTEM_FETCHING,
  HTTP_SYSTEM_SUCCESS,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateSystemToFetching = () => ({
  type: HTTP_SYSTEM_FETCHING,
})

const setStateSystemToFailed = () => ({
  type: HTTP_SYSTEM_FAILED,
})

const setStateSystemToSuccess = (payload) => ({
  type: HTTP_SYSTEM_SUCCESS,
  payload,
})

export const getSystems = () => {
  return (dispatch) => {
    dispatch(setStateSystemToFetching())
    doGetSystem(dispatch)
  }
}

const doGetSystem = (dispatch) => {
  httpClient
    .get(`${server.SYSTEM_URL}/info`)
    .then((result) => {
      dispatch(setStateSystemToSuccess(result.data))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateSystemToFailed())
    })
}
