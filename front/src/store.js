// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // This uses localStorage by default
import { combineReducers } from "redux";

// Your reducer for disbursedCustomers
const disbursedCustomersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_DISBURSED":
      return action.payload;
    default:
      return state;
  }
};

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  disbursedCustomers: disbursedCustomersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
