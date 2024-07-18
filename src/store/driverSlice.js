import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getDrivers = createAsyncThunk(
  "driver/getDrivers",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.post(`drivers/driversList`, {
        category: "active",
        userName: "",
        userEmail: "",
        userMobile: "",
        page: 1,
        page_limit: "15",
      });
      return res.data.data;
    } catch (err) {
    
      if (!err?.response) {
        throw err;
      }

      return rejectWithValue(err);
    }
  }
);

const driverSlice = createSlice({
  name: "driver",
  initialState: {
    isLoading: false,
    error: null,
    drivers: [],
  },
  reducers: {
    setDrivers: (state, action) => {
      state.drivers = action.payload.drivers;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDrivers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.drivers = action.payload;
      })
      .addCase(getDrivers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Something Went Wrong!";
        state.drivers = [];
      });
  },
});

export default driverSlice.reducer;
export const { setDrivers } = driverSlice.actions;
