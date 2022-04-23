import {
  HTTP_STOCK_FAILED,
  HTTP_STOCK_FETCHING,
  HTTP_STOCK_SUCCESS
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STOCK_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_STOCK_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_STOCK_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};
