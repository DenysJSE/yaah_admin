import './LessonCard.css'

import { ILessonCard } from 'types/LessonTypes.ts';
import { Link } from 'react-router-dom';

import InfoButton from 'assets/images/info-button.png';

function LessonCard({lesson}: ILessonCard) {
  return (
    <div className='lesson-card'>
      <div className='lesson-card-content'>
        <div className='lesson-card-info'>
          <h3 className='lesson-card-info-title'>{lesson.title}</h3>
          <p className='lesson-card-info-subject-title'><i>{lesson.subject.title}</i></p>
        </div>
        <div className='lesson-card-buttons'>
          <Link to={`/lessons/${lesson.id}`}>
            <img src={InfoButton} alt='info-button-icon' className='lesson-card-info-icon' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LessonCard