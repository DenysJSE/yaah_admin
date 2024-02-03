import api from '../http/index.ts'

export default class LessonsService {
  static async getAllLessons() {
    return api.get('/lessons')
  }
}