import {
  HTTP_USEREDIT_FAILED,
  HTTP_USEREDIT_FETCHING,
  HTTP_USEREDIT_SUCCESS,
  server,
  OK,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateUserEditToSuccess = (payload) => ({
  type: HTTP_USEREDIT_SUCCESS,
  payload,
})

const setStateUserEditToFetching = () => ({
  type: HTTP_USEREDIT_FETCHING,
})

const setStateUserEditToFailed = () => ({
  type: HTTP_USEREDIT_FAILED,
})

export const getUserById = (id) => {
  return (dispatch) => {
    dispatch(setStateUserEditToFetching())
    httpClient
      .get(`${server.USER_URL}/${id}`)
      .then((result) => {
        dispatch(setStateUserEditToSuccess(result.data))
      })
      .catch((error) => {
        console.log(error)
        dispatch(setStateUserEditToFailed())
      })
  }
}

export const updateUser = (history, formData) => {
  return async (dispatch) => {
    for (var pair of formData.entries()) {
      console.log(
        'Pair of formData in updateUser in user.edit.action: ',
        pair[0] + ', ' + pair[1],
      )
    }
    dispatch(setStateUserEditToFetching())
    try {
      let result = await httpClient.put(server.USER_URL, formData)
      console.log('Write formData successfully: ', result)
      if (result.data.result === OK) {
        dispatch(setStateUserEditToSuccess(result.data))
        history.goBack()
      } else {
        dispatch(setStateUserEditToFailed())
      }
    } catch (error) {
      alert(JSON.stringify(error))
      dispatch(setStateUserEditToFailed())
    }
  }
}
