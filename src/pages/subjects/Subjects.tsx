import './Subjects.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SubjectCard from './components/card/SubjectCard.tsx';
import addIcon from 'assets/images/add-for-button.png'
import SubjectService from 'services/SubjectService.ts';

interface IExam {
  ID: number
  title: string
  description: string
  award: number
}

interface ILesson {
  id: number
  title: string
  award: number
  lessonData: string
}

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
          <button className='subject-page-header-button'>
            <img src={addIcon} alt={'add-new-subject'} className='subject-page-add-new-icon' />
            Add new subject
          </button>
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