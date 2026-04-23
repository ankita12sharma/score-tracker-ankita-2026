import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../redux/slices/userSlice";
import { scoreSlice } from "../redux/slices/scoreSlice";
import { drawSlice } from "../redux/slices/drawSlice";

const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [scoreSlice.reducerPath]: scoreSlice.reducer,
    [drawSlice.reducerPath]: drawSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      scoreSlice.middleware,
      drawSlice.middleware,
    ),
});

export default store;
