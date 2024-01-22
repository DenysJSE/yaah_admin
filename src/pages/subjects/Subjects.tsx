import './Subjects.css';
import { useEffect, useState } from 'react';
import SubjectService from '../../services/SubjectService.tsx';
import SubjectCard from './components/card/SubjectCard.tsx';
import { Link } from 'react-router-dom';

export interface ISubject {
  title: string;
  description: string;
  lessonNumber: number;
  examsNumber: number;
  courseDuration: number;
}

function Subjects() {
  const [subjects, setSubjects] = useState<ISubject[] | null>(null);

  useEffect(() => {
    const getSubjects = async () => {
      const response = await SubjectService.getAllSubjects();
      setSubjects(response.data);
    };
    getSubjects();
  }, []);

  return (
    <div className='subject-page'>
      <div className='subject-page-header'>
        <h1 className='subject-page-header-title'>Subjects List</h1>
        <Link to={'/add-new-subject'}>
          <button className='subject-page-header-button'>Add new subject</button>
        </Link>
      </div>
      <div className='subject-page-subjects-list'>
        {subjects?.map(subject => (
          <SubjectCard subject={subject} key={subject.title} />
        ))}
      </div>
    </div>
  );
}

export default Subjects;