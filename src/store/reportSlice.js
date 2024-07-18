import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getReports = createAsyncThunk(
  "report/getReports",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.post(`customer/reports/tripmanifest/index`, {
        trip_id: params.id,
        date: "",
        enddate: "",
        pdfexp: true,
      });

      return res.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }

      return rejectWithValue(err);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    isLoading: false,
    error: null,
    reports: [],
  },
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload.reports;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getReports.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Something Went Wrong!";
        state.reports = [];
      });
  },
});

export default reportSlice.reducer;
export const { setReports } = reportSlice.actions;
