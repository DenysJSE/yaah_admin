import { createStore, combineReducers } from 'redux';
import userReducer from './user/UserSlice.ts';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;