import {
  HTTP_STOCK_FAILED,
  HTTP_STOCK_FETCHING,
  HTTP_STOCK_SUCCESS,
  OK,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateStockToSuccess = (payload) => ({
  type: HTTP_STOCK_SUCCESS,
  payload,
})

const setStateStockToFetching = () => ({
  type: HTTP_STOCK_FETCHING,
})

const setStateStockToFailed = () => ({
  type: HTTP_STOCK_FAILED,
})

export const getProductById = (id) => {
  return (dispatch) => {
    dispatch(setStateStockToFetching())
    httpClient
      .get(`${server.PRODUCT_URL}/${id}`)
      .then((result) => {
        dispatch(setStateStockToSuccess(result.data))
      })
      .catch((error) => {
        console.log(error)
        dispatch(setStateStockToFailed())
      })
  }
}

// not working by me
// export const getProductById = (id) => {
//   return async (dispatch) => {
//     dispatch(setStateStockToFetching());
//     try {
//       let result = await httpClient.put(`${server.PRODUCT_URL}/${id}`);
//       if (result.data.result === OK) {
//         dispatch(setStateStockToSuccess(result.data));
//       } else {
//         dispatch(setStateStockToFailed());
//       }
//     } catch (error) {
//       alert(JSON.stringify(error));
//       dispatch(setStateStockToFailed());
//     }
//   };
// };

// this working but we use inline function in stockCreate.js instread
// export const addProduct = (history, formData) => {
//   return async (dispatch) => {
//     await httpClient.post(server.PRODUCT_URL, formData);
//     history.goBack();
//   };
// };

// this style like register but not working
// export const addProduct = (history, formData) => {
//   return async (dispatch) => {
//     dispatch(setStateStockToFetching());
//     try {
//       let result = await httpClient.post(server.PRODUCT_URL, formData);
//       if (result.data.result === OK) {
//         // success
//         dispatch(setStateStockToSuccess(result.data));
//         // history.goBack('');
//       } else {
//         // failed
//         dispatch(setStateStockToFailed());
//       }
//     } catch (error) {
//       // failed
//       dispatch(setStateStockToFailed());
//     }
//   };
// };

export const getProductByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value
    dispatch(setStateStockToFetching())

    if (keyword !== null && keyword != '') {
      httpClient
        .get(`${server.PRODUCT_URL}/keyword/${keyword}`)
        .then((result) => {
          dispatch(setStateStockToSuccess(result.data))
        })
    } else {
      doGetProducts(dispatch)
    }
  }
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(setStateStockToFetching())
    await httpClient.delete(`${server.PRODUCT_URL}/${id}`)
    await doGetProducts(dispatch)
  }
}

export const getProducts = () => {
  return (dispatch) => {
    dispatch(setStateStockToFetching())
    doGetProducts(dispatch)
  }
}

const doGetProducts = (dispatch) => {
  httpClient
    .get(server.PRODUCT_URL)
    .then((result) => {
      dispatch(setStateStockToSuccess(result.data))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateStockToFailed())
    })
}
