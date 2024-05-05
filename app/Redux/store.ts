"use client";

import { LeadApi } from '../Services/users_service';
import { configureStore } from '@reduxjs/toolkit';
import sheetSelectionReducer from './sheetSelectionSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
      [LeadApi.reducerPath]: LeadApi.reducer,
      sheetSelection: sheetSelectionReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(LeadApi.middleware),
  });

export type RootState = ReturnType<typeof store.getState>;