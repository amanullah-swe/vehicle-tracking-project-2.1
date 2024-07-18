import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
// import { log } from "util";

export const getAcceleration = createAsyncThunk(
  "acceleration/getAcceleration",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.post(`customer/reports/acceleration`, {
        vehicle_id: "",
        startdate: "",
        enddate: "",
        pageid: "",
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

const AccelerationSlice = createSlice({
  name: "acceleration",
  initialState: {
    isLoading: false,
    error: null,
    acceleration: [],
  },
  reducers: {
    setAcceleration: (state, action) => {
      state.acceleration = action.payload.acceleration;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAcceleration.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAcceleration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.acceleration = action.payload;
      })
      .addCase(getAcceleration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Something Went Wrong!";
        state.acceleration = [];
      });
  },
});

export default AccelerationSlice.reducer;
export const { setAcceleration } = AccelerationSlice.actions;
