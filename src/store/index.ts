import { configureStore } from "@reduxjs/toolkit"
import dataContext from "./data"

export const store = configureStore({
  reducer: {
    dataContext,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
