import api from '../http';

interface IUpdatePassword {
  userID: number
  userPassword: string
  newUserPassword: string
}

interface IUpdateNickname {
  userID: number
  newNickname: string
}

export default class UserService {
  static async getAllUsers() {
    return api.get('users')
  }

  static async getUser() {
    return api.get('users/get_user')
  }

  static async updatePassword({userID, userPassword, newUserPassword}: IUpdatePassword) {
    return api.put('users/update_password', {userID, userPassword, newUserPassword})
  }

  static async updateUserNickname({userID, newNickname}: IUpdateNickname) {
    return api.put('users/update_nickname', {userID, newNickname})
  }
}