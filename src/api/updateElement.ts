import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Element } from "../types/types";
import { updateElementReducer } from "../store/elementsSlice";

export const updateElement = createAsyncThunk<void, Element>(
  'elements/updateElement',
  async (element, { rejectWithValue, dispatch }) => {
    // Обновляем состояние в redux
    dispatch(updateElementReducer(element));
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${element.id}`,
        {
          id: element.id,
          title: element.title,
          body: element.body,
          userId: element.userId,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
