import { Middleware } from "redux";
import axios from "axios";
import { RootState } from "../configureStore";
import * as actions from "../api";
import config from "../../config";

const api: Middleware<
  {}, // Most middlewares do not modify the dispatch return value
  RootState
> =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onSuccess, onStart, onError } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
      const response = await axios.request({
        baseURL: config.BASE_URL,
        url,
        method,
        data,
        headers: {},
      });

      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error: any) {
      // General
      dispatch(actions.apiCallFailed(error));
      // Specific
      if (onError) dispatch({ type: onError, payload: error });
    }
  };

export default api;
