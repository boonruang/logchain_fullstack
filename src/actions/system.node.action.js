import {
  HTTP_NODE_FAILED,
  HTTP_NODE_FETCHING,
  HTTP_NODE_SUCCESS,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateNodeToFetching = () => ({
  type: HTTP_NODE_FETCHING,
})

const setStateNodeToFailed = () => ({
  type: HTTP_NODE_FAILED,
})

const setStateNodeToSuccess = (payload) => ({
  type: HTTP_NODE_SUCCESS,
  payload,
})

export const getNodes = () => {
  return (dispatch) => {
    dispatch(setStateNodeToFetching())
    doGetNodes(dispatch)
  }
}

const doGetNodes = (dispatch) => {
  httpClient
    .get(`${server.SYSTEM_URL}/node`)
    .then((result) => {
      dispatch(setStateNodeToSuccess(result.data.result))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateNodeToFailed())
    })
}
