import {
  HTTP_USEREDIT_FAILED,
  HTTP_USEREDIT_FETCHING,
  HTTP_USEREDIT_SUCCESS,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_USEREDIT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_USEREDIT_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false }
    case HTTP_USEREDIT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}
