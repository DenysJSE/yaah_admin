import api from '../http/index.ts'

interface ILesson {
  title: string
  lessonData: string
  subjectId: number
  award: number
}

export default class LessonsService {
  static async getAllLessons() {
    return api.get('/lessons')
  }

  static async createNewLesson({title, lessonData, subjectId, award}: ILesson) {
    return api.post('/lessons', {title, lessonData, subjectId, award})
  }
}