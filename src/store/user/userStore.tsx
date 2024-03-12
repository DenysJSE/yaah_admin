import { makeAutoObservable } from "mobx";
import { toast } from 'react-toastify';

import AuthService from "services/AuthService.ts";
import UserService from 'services/UserService.ts';

interface IUser {
  id: number
  nickname: string
  email: string
  password: string
  coins: number
  roles: {
    id: number
    value: string
    description: string
  }
}

interface IUserLogin {
  email: string
  password: string
}

interface IUserRegistration {
  email: string
  password: string
  nickname: string
}

class UserStore {
  user = {};
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuthenticated(bool: boolean) {
    this.isAuthenticated = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async Login({ email, password }: IUserLogin) {
    try {
      const response = await AuthService.login({ email, password });
      localStorage.setItem("token", response.data.token);
      this.setIsAuthenticated(true);
      this.setUser(response.data.user);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const error = e.response.data.message
      console.error(error)
      toast.error(error)
    }
  }

  async registration({ email, password, nickname }: IUserRegistration) {
    try {
      const response = await AuthService.registration({ email, password, nickname });
      localStorage.setItem("token", response.data.token);
      this.setIsAuthenticated(true);
      this.setUser(response.data.user);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const error = e.response.data.message
      console.error(error)
      toast.error(error)
    }
  }

  async getUser() {
    try {
      const response = await UserService.getUser()
      const userData = JSON.stringify(response.data)
      localStorage.setItem('user', userData)
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(e.response.data.message);
    }
  }
}

const userStore = new UserStore();

export default userStore;