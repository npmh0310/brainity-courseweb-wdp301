import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";


const store = configureStore({
  reducer: {
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice
  }
});

export default store;