import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { api } from "../Api/api";
import visitorReducer from "./visitorSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "visitor"],
};
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  visitor: visitorReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["register", "rehydrate"],
      },
    }).concat(api.middleware),
});

export const parsistor = persistStore(store);
