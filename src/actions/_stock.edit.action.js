import {
  HTTP_STOCK_EDIT_FAILED,
  HTTP_STOCK_EDIT_FETCHING,
  HTTP_STOCK_EDIT_INITIALED,
  HTTP_STOCK_EDIT_SUCCESS,
  OK,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateStockToFetching = () => ({
  type: HTTP_STOCK_EDIT_FETCHING
});

export const setStateStockToSuccess = (payload) => ({
  type: HTTP_STOCK_EDIT_SUCCESS,
  payload
});

export const setStateStockToFailed = () => ({
  type: HTTP_STOCK_EDIT_FAILED
});

export const setStateStockToInitialed = (isFinished) => ({
  type: HTTP_STOCK_EDIT_INITIALED,
  payload: isFinished
});

export const updateProduct = (history, formData) => {
  return async (dispatch) => {
    dispatch(setStateStockToFetching());
    try {
      let result = await httpClient.put(server.PRODUCT_URL);
      if (result.data.result === OK) {
        dispatch(setStateStockToSuccess(result.data));
        history.goBack();
      } else {
        dispatch(setStateStockToFailed());
      }
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStateStockToFailed());
    }
  };
};
