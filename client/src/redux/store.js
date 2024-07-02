import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
// import teacherSlice from "./features/teacherSlice";
import authSlice from "./features/authSlice";
import learningSlice from "./features/learningSlice";
import cart from "./features/cartSlice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    // teacherCRUD: teacherSlice,
    learningSlice: learningSlice,
    cart: cart
  },
});

export default store;
