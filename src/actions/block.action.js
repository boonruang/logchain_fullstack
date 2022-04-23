import {
  HTTP_BLOCK_FAILED,
  HTTP_BLOCK_FETCHING,
  HTTP_BLOCK_SUCCESS,
  HTTP_BLOCKCOUNT_SUCCESS,
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

const setStateBlockCountToSuccess = (payload) => ({
  type: HTTP_BLOCKCOUNT_SUCCESS,
  payload,
})

export const getBlockCount = () => {
  return (dispatch) => {
    httpClient.get(`${server.BC_URL}/count`).then((result) => {
      dispatch(setStateBlockCountToSuccess(result.data))
    })
  }
}

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
