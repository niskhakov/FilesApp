import { Middleware } from "redux";
import axios from "axios";
import { RootState } from "../configureStore";
import * as actions from "../api";

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
        baseURL: "https://preview.public2.ru/api/yd/",
        url,
        method,
        data,
        headers: {
          Authorization: "OAuth AQAAAABjgH0MAAhJJFZNrfxNXEY7iRW9we8XDkQ",
        },
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
