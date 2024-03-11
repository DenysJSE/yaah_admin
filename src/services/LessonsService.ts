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

  static async getLessonById(id: number) {
    return api.get(`/lessons/get_lesson_by_id_admin/${id}`)
  }

  static async deleteLesson(id: number) {
    return api.delete(`/lessons/${id}`)
  }
}