import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/itemsSlice";
import categoriesReducer from "./features/categoriesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      items: itemsReducer,
      categories: categoriesReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
