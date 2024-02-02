import api from '../http/index.ts'

interface ISubject {
  title: string
  description: string
}

export default class SubjectService {
  static async createNewSubject({title, description}: ISubject) {
    return api.post('subjects', {title, description})
  }

  static async getAllSubjects() {
    return api.get('subjects')
  }

  static async getSubjectById(id: number) {
    return api.get(`subjects/${id}`)
  }

  static async updateSubjectData(id: number, {title, description}: ISubject) {
    return api.put(`subjects/${id}`, {title, description})
  }

  static async deleteSubject(id: number) {
    return api.delete(`subjects/${id}`)
  }
}