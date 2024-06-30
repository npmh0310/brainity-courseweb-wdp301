import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
// import teacherSlice from "./features/teacherSlice";
import authSlice from "./features/authSlice";
import learningSlice from "./features/learningSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    // teacherCRUD: teacherSlice,
    learningSlice: learningSlice 
  },
});

export default store;
