import './SubjectCard.css';
import { ISubject } from 'pages/subjects/Subjects.tsx';
import InfoButton from 'assets/images/info-button.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ISubjectCard {
  subject: ISubject;
}

function SubjectCard({ subject }: ISubjectCard) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className='subject-card'>
      <div className='subject-card-content'>
        <div className='subject-card-info'>
          <h3 className='subject-card-title'>{subject.title}</h3>
          <p className='subject-card-description'>{subject.description}</p>
        </div>
        <div className='subject-card-buttons'>
          <div
            className='custom-tooltip-container'
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <Link to={`/subject-details/${subject.id}`}>
              <img src={InfoButton} alt='info-button-icon' className='subject-card-info-icon' />
            </Link>
            {isTooltipVisible && (
              <div className='custom-tooltip'>
                <p>More info about the subject</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;