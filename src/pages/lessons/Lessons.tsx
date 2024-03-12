import './Lessons.css'

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import addIcon from 'assets/images/add-for-button.png';
import LessonCard from 'pages/lessons/components/card/LessonCard.tsx';
import LessonsService from 'services/LessonsService.ts';

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

interface ILessons {
  id: number
  isDone: boolean
  lesson: ILesson
}

function Lessons() {
  const [lessons, setLessons] = useState<ILessons[] | null>(null)

  useEffect(() => {
    const getLessons = async () => {
      const response = await LessonsService.getAllLessons()
      setLessons(response.data)
    }
    getLessons()
  }, []);

  return (
    <div className='lessons-page'>
      <div className='lessons-page-header'>
        <h1 className='lessons-page-header-title'>Lessons List</h1>
        <Link to={'/add-new-lesson'}>
          <button className='lessons-page-header-button'>
            <img src={addIcon} alt={'add-new-lesson'} className='lessons-page-add-new-icon' />
            Add new lesson
          </button>
        </Link>
      </div>
      <div className='lessons-page-lessons-list'>
        {lessons?.map(lesson => (
          <LessonCard lesson={lesson.lesson} key={lesson.id} />
        ))}
      </div>
    </div>
  );
}

export default Lessons