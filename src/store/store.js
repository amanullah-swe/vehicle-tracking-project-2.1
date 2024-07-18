import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import reportReducer from "./reportSlice";
import driverReducer from "./driverSlice";
import vehicleListReducer from"./vehicleListSlice";
import tripActivityReducer from "./tripActivitySlice";
import DriverRankingReducer from "./driverRankingSlice"
import VehicleAlertReducer from "./VehicleAlertSlice";
import accelerationReducer from "./accelerationSlice";

const rootReducer = combineReducers({
  auth: loginSlice,
  report: reportReducer,
  driver: driverReducer,
  vehicleList : vehicleListReducer,
  tripActivity : tripActivityReducer,
  DriverRanking : DriverRankingReducer,
  vehicleAlert  : VehicleAlertReducer,
  acceleration : accelerationReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
