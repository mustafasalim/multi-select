import { createSlice } from "@reduxjs/toolkit"

// Define a type for the slice state
interface SearchState {
  value: string
}

// Define the initial state using that type
const initialState: SearchState = {
  value: "",
}

export const searchSlice = createSlice({
  name: "search",

  initialState,
  reducers: {
    _searchContext: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { _searchContext } = searchSlice.actions

export default searchSlice.reducer
