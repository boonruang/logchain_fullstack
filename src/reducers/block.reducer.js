import {
  HTTP_BLOCK_FAILED,
  HTTP_BLOCK_FETCHING,
  HTTP_BLOCK_SUCCESS,
  HTTP_BLOCKCOUNT_SUCCESS,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  count: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_BLOCK_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_BLOCK_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false }
    case HTTP_BLOCK_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    case HTTP_BLOCKCOUNT_SUCCESS:
      return { ...state, count: payload }
    default:
      return state
  }
}
