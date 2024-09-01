// import { updateElement } from './../utils/utils';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { ElementsState, GetElementsResponse, Element } from "../types/types"
import { fetchElements } from "../api/fetchElements"
import { deleteElement } from "../api/deleteElement"
import { searchById, updateElementUtil } from "../utils/utils"

const initialState: ElementsState = {
  elements: [],
  loading: false,
  error: null,
}

const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    deleteElementReducer(state, action: PayloadAction<number>) {
      state.elements = searchById(state.elements, action.payload)
    },
    updateElementReducer(state, action: PayloadAction<Element>) {
      state.elements = updateElementUtil(state.elements, action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchElements.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.loading = false
        state.elements = action.payload
      })
      .addCase(deleteElement.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchElements.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { deleteElementReducer, updateElementReducer } = elementsSlice.actions

export default elementsSlice.reducer
