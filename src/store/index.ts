import { configureStore } from "@reduxjs/toolkit"
import dataContext from "./data"
import searchSlice from "./search"

export const store = configureStore({
  reducer: {
    dataContext,
    searchSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
