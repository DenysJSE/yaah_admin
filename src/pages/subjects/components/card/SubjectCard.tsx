import './SubjectCard.css'
import { ISubject } from 'pages/subjects/Subjects.tsx';

interface ISubjectCard {
  subject: ISubject
}

function SubjectCard({subject}: ISubjectCard) {
  return (
    <div className='subject-card'>
      <div className='subject-card-content'>
        <div className='subject-card-info'>
          <h3 className='subject-card-title'>{subject.title}</h3>
          <p className='subject-card-description'>{subject.description}</p>
        </div>
        <div className='subject-card-buttons'>
          <button className='subject-card-button-more-info'>More info</button>
        </div>
      </div>

    </div>
  );
}

export default SubjectCard