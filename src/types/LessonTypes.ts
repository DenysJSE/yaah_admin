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

export interface ILessonCreation {
  lessonTitle: string
  setLessonTitle: (value: string) => void
  lessonData: string
  setLessonData: (value: string) => void
  setSubjectId: (value: number) => void
  searchQueryOption?: string
  handleActionOnLesson: () => void
  buttonTitle?: string
}