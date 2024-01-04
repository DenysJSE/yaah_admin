import api from '../http/index.ts'

interface IUserLogin {
  email: string,
  password: string
}

//TODO: Brought out types to file
interface IUserRegistration {
  email: string,
  password: string
  nickname: string
}

export default class AuthService {
  static async login({ email, password }: IUserLogin) {
    return api.post('/auth/login', { email, password });
  }

  static async registration({ email, password, nickname }: IUserRegistration) {
    return api.post('/auth/registration', { email, password, nickname });
  }
}