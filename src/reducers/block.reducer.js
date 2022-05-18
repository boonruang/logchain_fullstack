import {
  HTTP_BLOCK_FAILED,
  HTTP_BLOCK_FETCHING,
  HTTP_BLOCK_SUCCESS,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_BLOCK_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_BLOCK_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false }
    case HTTP_BLOCK_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}
