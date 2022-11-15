import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<any>("apiCallBegan");
export const apiCallSuccess = createAction<any>("apiCallSuccess");
export const apiCallFailed = createAction<any>("apiCallFailed");
