import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getvehicleList = createAsyncThunk(
  "vehicleList/getvehicleList",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.post(`vehicle/allVehicles`, {
        key:"VehicleList"
      });
      return res.data.data;
    } catch (err) {
      console.log(err, "res====>");
      if (!err?.response) {
        throw err;
      }

      return rejectWithValue(err);
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicleList",
  initialState: {
    isLoading: false,
    error: null,
    vehicleList: [],
  },
  reducers: {
    setVehicleList: (state, action) => {
      state.vehicleList = action.payload.vehicleList;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getvehicleList.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getvehicleList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.vehicleList = action.payload;
      })
      .addCase(getvehicleList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Something Went Wrong!";
        state.vehicleList = [];
      });
  },
});

export default vehicleSlice.reducer;
export const { setVehicleList } = vehicleSlice.actions;
