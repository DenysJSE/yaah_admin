import './Lessons.css';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import addIcon from 'assets/images/add-for-button.png';
import NotCreatedLesson from 'assets/images/notCreatedElement.svg';
import LessonCard from 'pages/lessons/components/card/LessonCard.tsx';
import LessonsService from 'services/LessonsService.ts';
import { ILessons } from 'types/LessonTypes.ts';
import { quantum } from 'ldrs';

function Lessons() {
  const [lessons, setLessons] = useState<ILessons[] | null>(null);
  const [loading, setLoading] = useState(true);
  quantum.register();

  useEffect(() => {
    const getLessons = async () => {
      try {
        const response = await LessonsService.getAllLessons();
        setLessons(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getLessons();
  }, []);

  if (loading) {
    return <div className='lesson-component-loading'>
      <l-quantum
        size='55'
        speed='2'
        color='#B9C7FC'
      />
    </div>;
  }

  return (
    <div className='lessons-page'>
      <div className='lessons-page-header'>
        <h1 className='lessons-page-header-title'>Lessons List</h1>
        <Link to={'/add-new-lesson'}>
          <button className='lessons-page-header-button-add-new-lesson'>
            <img src={addIcon} alt={'add-new-lesson'} className='lessons-page-header-button-add-new-lesson-img' />
            Add new lesson
          </button>
        </Link>
      </div>
      <div className='lessons-page-lessons-list'>
        {lessons ?
          lessons?.map(lesson => (
            <LessonCard lesson={lesson.lesson} key={lesson.id} />
          ))
          :
          <div className='lessons-page-lessons-list-empty-lessons'>
            <img
              src={NotCreatedLesson}
              alt='not-created-lesson'
              className='lessons-page-lessons-list-empty-lessons-image'
            />
            <p className='lessons-page-lessons-list-empty-lessons-title'>No lessons have been created here yet</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Lessons;