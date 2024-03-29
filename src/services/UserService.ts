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

interface IAddRole {
  userID: number
  value: string
}

export default class UserService {
  static async getAllUsers() {
    return api.get('users')
  }

  static async getUser() {
    return api.get('users/get_user')
  }

  static async getUserByID(id: number) {
    return api.get(`users/get_user/${id}`)
  }

  static async updatePassword({userID, userPassword, newUserPassword}: IUpdatePassword) {
    return api.put('users/update_password', {userID, userPassword, newUserPassword})
  }

  static async updateUserNickname({userID, newNickname}: IUpdateNickname) {
    return api.put('users/update_nickname', {userID, newNickname})
  }

  static async deleteUser(id: number) {
    return api.delete(`users/${id}`)
  }

  static async addRole({ userID, value }: IAddRole) {
    return api.post('users/role', {userID, value})
  }

  static async deleteUserRole(userID: number, roleID: number) {
    return api.delete(`users/${userID}/roles/${roleID}`)
  }
}