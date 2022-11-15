import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from "../../interfaces/yandex";
import { apiCallBegan } from "../api";

interface InitialState {
  list: Item[];
  loading: boolean;
  lastFetch: Date | null;
}

const initialState: InitialState = {
  list: [],
  loading: false,
  lastFetch: null,
};

const slice = createSlice({
  name: "files",
  initialState,
  reducers: {
    filesReceived: (files, action: PayloadAction<Item[]>) => {
      files.list = action.payload;
    },
  },
});

export const { filesReceived } = slice.actions;
export default slice.reducer;

// Action Creators
const url = "resources?path=";
export const loadFiles = (path: string = "/") =>
  apiCallBegan({
    url: url + path,
    onSuccess: filesReceived.type,
  });
