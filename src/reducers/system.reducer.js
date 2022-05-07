import {
  HTTP_SYSTEM_FAILED,
  HTTP_SYSTEM_FETCHING,
  HTTP_SYSTEM_SUCCESS,
} from '../constants'

const initialState = {
  sysResult: null,
  isFetching: false,
  isError: false,
  nodeCount: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_SYSTEM_FETCHING:
      return { ...state, sysResult: null, isFetching: true, isError: false }
    case HTTP_SYSTEM_SUCCESS:
      return { ...state, sysResult: payload, isFetching: false, isError: false }
    case HTTP_SYSTEM_FAILED:
      return { ...state, sysResult: null, isFetching: false, isError: true }
    default:
      return state
  }
}
