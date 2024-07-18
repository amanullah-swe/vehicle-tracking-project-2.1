import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getTripActivity = createAsyncThunk(
  "tripActivity/getTripActivity",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.post(`customer/reports/tripactivity`, {
        startdate: "2023-11-08",
        trip: "",
        enddate: "",
        pageid: "1",
        page_limit: '10',
        format: "json",
      });
     
        return res.data.tripmodel;
    } catch (err) {
 
      if (!err?.response) {
        throw err;
      }

      return rejectWithValue(err);
    }
  }
);

const tripActivitySlice = createSlice({
  name: "tripActivity",
  initialState: {
    isLoading: false,
    error: null,
    tripActivity: [],
  },
  reducers: {
    setTripActivity: (state, action) => {
      state.tripActivity = action.payload.tripActivity;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTripActivity.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTripActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tripActivity = action.payload;
      })
      .addCase(getTripActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Something Went Wrong!";
        state.drivers = [];
      });
  },
});

export default tripActivitySlice.reducer;
export const { setTripActivity } = tripActivitySlice.actions;
