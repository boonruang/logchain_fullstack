import {
  HTTP_REGISTER_FAILED,
  HTTP_REGISTER_FETCHING,
  HTTP_REGISTER_SUCCESS,
  OK,
  server,
} from '../constants'
import { httpClient } from './../utils/HttpClient'

export const setRegisterStateToFetching = () => ({
  type: HTTP_REGISTER_FETCHING,
})

export const setRegisterStateToSuccess = (payload) => ({
  type: HTTP_REGISTER_SUCCESS,
  payload,
})

export const setRegisterStateToFailed = () => ({
  type: HTTP_REGISTER_FAILED,
})

export const register = (history, credentail) => {
  return async (dispatch) => {
    dispatch(setRegisterStateToFetching())

    try {
      let result = await httpClient.post(server.REGISTER_URL, credentail)
      if (result.data.result == OK) {
        // success
        dispatch(setRegisterStateToSuccess(result.data.result))
        history.goBack()
      } else {
        // failed
        dispatch(setRegisterStateToFailed())
      }
    } catch (error) {
      // failed
      dispatch(setRegisterStateToFailed())
    }
  }
}
