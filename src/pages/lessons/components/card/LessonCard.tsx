import './LessonCard.css'
import { ILesson } from 'pages/lessons/Lessons.tsx';
import editIcon from 'assets/images/edit.png';

interface ILessonCard {
  lesson: ILesson
}

function LessonCard({lesson}: ILessonCard) {
  return (
    <div className='lesson-card'>
      <div className='lesson-card-content'>
        <div className='lesson-card-info'>
          <h3 className='lesson-card-title'>{lesson.title}</h3>
          <p className='lesson-card-subject-title'>{lesson.subject.title}</p>
        </div>
        <div className='lesson-card-buttons'>
          <button className='lesson-card-button edit'>
            <img src={editIcon} alt='edit-lesson-img' className='lesson-card-button-icon' />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonCard