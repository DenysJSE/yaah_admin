import { ILesson } from 'types/LessonTypes.ts';
import { IExam } from 'types/ExamTypes.ts';

export interface ISubject {
  id: number;
  title: string;
  description: string;
  lessonsNumber: number;
  examsNumber: number;
  courseDuration: number;
  exams: IExam[];
  lessons: ILesson[];
}

export interface ISubjectCard {
  subject: ISubject;
}

export interface ISubjectCreation {
  title?: string;
  setTitle: (title: string) => void;
  description?: string;
  setDescription: (description: string) => void;
  handleActionOnSubject: () => void;
  buttonTitle?: string;
}