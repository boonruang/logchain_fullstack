import {
  HTTP_BLOCK_FAILED,
  HTTP_BLOCK_FETCHING,
  HTTP_BLOCK_SUCCESS,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateBlockToSuccess = (payload) => ({
  type: HTTP_BLOCK_SUCCESS,
  payload,
})

const setStateBlockToFetching = () => ({
  type: HTTP_BLOCK_FETCHING,
})

const setStateBlockToFailed = () => ({
  type: HTTP_BLOCK_FAILED,
})

export const getBlocks = () => {
  return (dispatch) => {
    dispatch(setStateBlockToFetching())
    doGetBlocks(dispatch)
  }
}

const doGetBlocks = (dispatch) => {
  httpClient
    .get(server.BLOCK_URL)
    .then((result) => {
      dispatch(setStateBlockToSuccess(result.data))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateBlockToFailed())
    })
}
