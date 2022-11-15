import { combineReducers } from "@reduxjs/toolkit";
import filesReducer from "./entities/files";

export default combineReducers({
  files: filesReducer,
});
