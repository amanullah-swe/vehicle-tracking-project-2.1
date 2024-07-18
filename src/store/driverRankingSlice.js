import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
// import { log } from "util";

export const getDriverRanking = createAsyncThunk(
  "driverRanking/getDriverRanking",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.post(`customer/reports/driverranking`, {
        driver_id: "",
        startdate: "",
        enddate: "",
        pdfexp: false,
      });
    
      return res.data.statitics;
    } catch (err) {
     
      if (!err?.response) {
        throw err;
      }

      return rejectWithValue(err);
    }
  }
);

const driverRankingSlice = createSlice({
  name: "driverRanking",
  initialState: {
    isLoading: false,
    error: null,
    driverRanking: [],
  },
  reducers: {
    setDriverRanking: (state, action) => {
      state.driverRanking = action.payload.drivers;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDriverRanking.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDriverRanking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.driverRanking = action.payload;
      })
      .addCase(getDriverRanking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Something Went Wrong!";
        state.driverRanking = [];
      });
  },
});

export default driverRankingSlice.reducer;
export const { setDriverRanking } = driverRankingSlice.actions;
