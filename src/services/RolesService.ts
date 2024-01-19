import api from '../http';

export default class RolesService {
  static async getAllRoles() {
    return api.get('roles')
  }
}