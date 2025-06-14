// store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
})

// Types for useDispatch & useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
