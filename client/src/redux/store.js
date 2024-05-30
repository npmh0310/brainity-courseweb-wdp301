import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import courseSlice from "./features/coursesSlice";
import authSlice from "./features/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    courses: courseSlice,
  },
});

export default store;
