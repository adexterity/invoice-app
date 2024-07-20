import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoice/invoiceSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
