import {
  HTTP_BLOCKDATA_FAILED,
  HTTP_BLOCKDATA_FETCHING,
  HTTP_BLOCKDATA_SUCCESS,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_BLOCKDATA_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_BLOCKDATA_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false }
    case HTTP_BLOCKDATA_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}
