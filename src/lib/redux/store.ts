import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import utilityReducer from '@/lib/redux/slice/utilitySlice'

const rootReducer = combineReducers({
  utility: utilityReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, 
  RootState, 
  unknown, 
  Action<string>
>;