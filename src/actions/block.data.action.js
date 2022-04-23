import {
  HTTP_BLOCKDATA_FAILED,
  HTTP_BLOCKDATA_FETCHING,
  HTTP_BLOCKDATA_SUCCESS,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateBlockDataToSuccess = (payload) => ({
  type: HTTP_BLOCKDATA_SUCCESS,
  payload,
})

const setStateBlockDataToFetching = () => ({
  type: HTTP_BLOCKDATA_FETCHING,
})

const setStateBlockDataToFailed = () => ({
  type: HTTP_BLOCKDATA_FAILED,
})

export const getBlockById = (id) => {
  return (dispatch) => {
    dispatch(setStateBlockDataToFetching())
    httpClient
      .get(`${server.BLOCK_URL}/${id}`)
      .then((result) => {
        dispatch(setStateBlockDataToSuccess(result.data))
      })
      .catch((error) => {
        console.log(error)
        dispatch(setStateBlockDataToFailed())
      })
  }
}
