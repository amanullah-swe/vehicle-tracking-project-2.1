import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
// import { log } from "util";

export const getVehicleAlert = createAsyncThunk(
  "VehicleAlert/getVehicleAlert",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.post(`customer/reports/vehiclealert`, {
        vehicle_id: "",
        startdate: "2023-11-23",
        enddate: "",
        pageid: "1",
        format: "json",
      });
     
      return res.data;
    } catch (err) {
     ;
      if (!err?.response) {
        throw err;
      }

      return rejectWithValue(err);
    }
  }
);

const VehicleAlertSlice = createSlice({
  name: "VehicleAlert",
  initialState: {
    isLoading: false,
    error: null,
    VehicleAlert: [],
  },
  reducers: {
    setVehicleAlert: (state, action) => {
      state.VehicleAlert = action.payload.drivers;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getVehicleAlert.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVehicleAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.VehicleAlert = action.payload;
      })
      .addCase(getVehicleAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Something Went Wrong!";
        state.VehicleAlert = [];
      });
  },
});

export default VehicleAlertSlice.reducer;
export const { setVehicleAlert } = VehicleAlertSlice.actions;
