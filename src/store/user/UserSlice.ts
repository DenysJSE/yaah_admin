import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  id: number;
  nickname: string;
  email: string;
  password?: string
  coins: number;
  created_at: string
  roles: {
    id: number;
    value: string;
    description: string;
  };
}


interface IUserState {
  user: IUser;
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  user: {
    id: 0,
    nickname: '',
    email: '',
    password: '',
    created_at: '',
    coins: 0,
    roles: {
      id: 0,
      value: '',
      description: ''
    }
  },
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    }
  }
});

export const { setIsAuthenticated, setUser } = userSlice.actions;
export default userSlice.reducer;