export interface ILesson {
  id: number
  title: string
  award: number
  lessonData: string
  subject: {
    id: number
    title: string
    description: string
    lessonsNumber: number
    examsNumber: number
  }
}

export interface ILessons {
  id: number
  isDone: boolean
  lesson: ILesson
}

export interface ILessonCard {
  lesson: ILesson
}