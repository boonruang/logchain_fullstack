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
    .get(`${server.USER_URL}/list`)
    .then((result) => {
      dispatch(setStateUserToSuccess(result.data.result))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateUserToFailed())
    })
}

export const deleteUserById = (id) => {
  return async (dispatch) => {
    dispatch(setStateUserToFetching())
    await httpClient.delete(`${server.USER_URL}/${id}`)
    await doGetUsers(dispatch)
  }
}

export const addUser = (history, formData) => {
  return async (dispatch) => {
    for (var pair of formData.entries()) {
      console.log(
        'Pair of formData in addUser in user.action: ',
        pair[0] + ', ' + pair[1],
      )
    }

    try {
      // success
      let result = await httpClient.post(server.USER_URL, formData)
      await doGetUsers(dispatch)
      console.log('Write formData successfully: ', result)
      history.goBack()
    } catch (error) {
      // failed
      console.log('Write formData Error: ', error.toString())
    }
  }
}
