"use client";

import { LeadApi } from '../Services/users_service';
import { configureStore } from '@reduxjs/toolkit';
import sheetSelectionReducer from './sheetSelectionSlice';
import authReducer from './authSlice';
import bootCampProgramReducer from './Slices/bootcampProgramSeries';
import bootcampSourceReducer from './Slices/bootcampSelectivesSlice';
import lineChartServices from '../Services/lineChartServices';

export const store = configureStore({
    reducer: {
      [LeadApi.reducerPath]: LeadApi.reducer,
      [lineChartServices.reducerPath]: lineChartServices.reducer,
      sheetSelection: sheetSelectionReducer,
      bootcampProgram: bootCampProgramReducer,
      bootcampSource: bootcampSourceReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(LeadApi.middleware, lineChartServices.middleware),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;