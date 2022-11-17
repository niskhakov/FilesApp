import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileItem, Item } from "../../interfaces/yandex";
import { apiCallBegan } from "../api";
import { RootState, AppDispatch } from "../configureStore";
import { GenericItem } from "../../interfaces/file";
import config from "../../config";

interface InitialState {
  list: Item[];
  loading: boolean;
  lastFetch: Date | null;
  currentPath: string;
  pagination: {
    totalPages: number;
    pagesFetched: number[];
  };
}

const initialState: InitialState = {
  list: [],
  loading: false,
  lastFetch: null,
  currentPath: "/",
  pagination: {
    totalPages: 0,
    pagesFetched: [],
  },
};

const slice = createSlice({
  name: "files",
  initialState,
  reducers: {
    filesRequested: (files, action) => {
      files.loading = true;
    },
    filesRequestFailed: (files, action) => {
      files.loading = false;
    },
    filesRequestLoaded: (files, action) => {
      files.loading = false;
    },
    filesReceived: (files, action: PayloadAction<FileItem>) => {
      const items = action.payload._embedded.items.map((item) => ({
        ...item,
        preview:
          item.preview &&
          item.preview.replace(
            "https://downloader.disk.yandex.ru/preview/",
            config.BASE_URL + "preview/"
          ),
      }));
      const { total, limit } = action.payload._embedded;
      const totalPages = Math.ceil(total / limit);
      files.pagination = {
        totalPages,
        pagesFetched: [1],
      };
      files.currentPath = action.payload.path.replace("disk:", "");
      files.list = items;
      files.loading = false;
    },
    filesPageReceived: (files, action: PayloadAction<FileItem>) => {
      const payloadPath = action.payload.path.replace("disk:", "");
      if (files.currentPath !== payloadPath) {
        return;
      }

      const items = action.payload._embedded.items.map((item) => ({
        ...item,
        preview:
          item.preview &&
          item.preview.replace(
            "https://downloader.disk.yandex.ru/preview/",
            config.BASE_URL + "preview/"
          ),
      }));

      const { limit, offset } = action.payload._embedded;

      const currentPage = offset / limit + 1;
      if (!files.pagination.pagesFetched.includes(currentPage)) {
        files.pagination.pagesFetched.push(currentPage);
        files.list.push(...items);
      }
    },
  },
});

export const {
  filesRequested,
  filesRequestLoaded,
  filesRequestFailed,
  filesReceived,
  filesPageReceived,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "resources?path=";
const limit = 20;
export const loadFiles =
  (path: string = "/") =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    console.log("before call", getState().entities.files.pagination.totalPages);
    await dispatch(
      apiCallBegan({
        url: url + encodeURIComponent(path) + `&preview_size=M&limit=${limit}`,
        onSuccess: filesReceived.type,
        onFailed: filesRequestFailed.type,
        onStart: filesRequested.type,
      })
    );
    const { totalPages } = getState().entities.files.pagination;
    console.log("after call", totalPages);
    if (totalPages > 1) {
      for (let page = 2; page <= totalPages; page++) {
        await dispatch(
          apiCallBegan({
            url:
              url +
              encodeURIComponent(path) +
              `&preview_size=M&limit=${limit}&offset=${(page - 1) * limit}`,
            onSuccess: filesPageReceived.type,
            onFailed: filesRequestFailed.type,
            onStart: filesRequested.type,
          })
        );
      }
    }
  };

export const loadPage =
  (page: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const path = getState().entities.files.currentPath;
    const { pagesFetched, totalPages } = getState().entities.files.pagination;
    if (page > totalPages) return;
    if (!pagesFetched.includes(page)) {
      await dispatch(
        apiCallBegan({
          url:
            url +
            encodeURIComponent(path) +
            `&preview_size=M&limit=${limit}&offset=${(page - 1) * limit}`,
          onSuccess: filesPageReceived.type,
          onFailed: filesRequestFailed.type,
          onStart: filesRequested.type,
        })
      );
    }
  };

export const loadAllPages =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { totalPages, pagesFetched } = getState().entities.files.pagination;
    for (let i = 1; i <= totalPages; i++) {
      if (pagesFetched.includes(i)) continue;
      await dispatch(loadPage(i));
    }
  };

export const goBack =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    console.log(getState().entities.files.currentPath);
    let path = getState()
      .entities.files.currentPath.split("/")
      .slice(0, -1)
      .join("/");
    if (!path) path = "/";
    dispatch(loadFiles(path));
  };

// Selectors

export const selectFiles = (state: RootState): GenericItem[] => {
  const files = state.entities.files.list;
  return files;
};

export const getCurrentPath = (state: RootState): string => {
  return state.entities.files.currentPath;
};

export const getTotalPages = (state: RootState): number => {
  return state.entities.files.pagination.totalPages;
};

export const isRoot = (state: RootState): boolean => {
  return state.entities.files.currentPath == "/";
};

export const isLoading = (state: RootState): boolean => {
  return state.entities.files.loading;
};
