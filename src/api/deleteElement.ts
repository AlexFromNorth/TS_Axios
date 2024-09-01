import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetElementsResponse } from "../types/types"; // предположим, что GetElementsResponse – это тип данных, возвращаемых из запроса
import { deleteElementReducer } from "../store/elementsSlice";

export const deleteElement = createAsyncThunk<void, number>(
  'elements/deleteElement',
  async (id, { rejectWithValue, dispatch }) => {
      dispatch(deleteElementReducer(id))
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
        );
      // Если вам нужно вернуть данные из этой функции, укажите тип возврата, например `void` можно заменить на `TypeOfReturnedData`
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
