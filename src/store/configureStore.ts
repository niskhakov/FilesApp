import { configureStore } from "@reduxjs/toolkit";
import api from "./middleware/api";
import reducer from "./reducer";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(api),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducer>;
export default store;
