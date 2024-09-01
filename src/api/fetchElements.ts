import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetElementsResponse } from "../types/types";

export const fetchElements = createAsyncThunk(
    'elements/fetchElements',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get<GetElementsResponse>(
          'https://jsonplaceholder.typicode.com/posts',
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );