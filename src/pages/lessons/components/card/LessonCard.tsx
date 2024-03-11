import './LessonCard.css'
import { ILesson } from 'pages/lessons/Lessons.tsx';
import InfoButton from 'assets/images/info-button.png';
import { Link } from 'react-router-dom';

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
          <Link to={`/lessons/${lesson.id}`}>
            <img src={InfoButton} alt='info-button-icon' className='subject-card-info-icon' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LessonCard