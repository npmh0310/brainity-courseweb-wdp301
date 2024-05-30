import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import courseSlice from "./features/coursesSlice";

const store = configureStore({
  reducer: {
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    courses: courseSlice,
  },
});

export default store;
