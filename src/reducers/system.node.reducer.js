import {
  HTTP_NODE_FAILED,
  HTTP_NODE_FETCHING,
  HTTP_NODE_SUCCESS,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  nodeCount: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_NODE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_NODE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false }
    case HTTP_NODE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}
