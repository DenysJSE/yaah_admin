import './LessonCreation.css';

import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';

import Close from 'assets/images/close.png';
import SubjectService from 'services/SubjectService.ts';
import { ISubject } from 'types/SubjectTypes.ts';
import { ILessonCreation } from 'types/LessonTypes.ts';

function LessonCreation(
  {
    lessonTitle,
    setLessonTitle,
    lessonData,
    setLessonData,
    setSubjectId,
    searchQueryOption,
    handleActionOnLesson,
    buttonTitle
  }: ILessonCreation
) {
  const [filteredData, setFilteredData] = useState<ISubject[] | null>(null);
  const [subjects, setSubjects] = useState<ISubject[] | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchQueryOption ? searchQueryOption : '');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQueryOption) {
      setSearchQuery(searchQueryOption);
    }
  }, [searchQueryOption]);

  useEffect(() => {
    const fetchSubjectTitles = async () => {
      try {
        const response = await SubjectService.getAllSubjects();
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjectTitles();

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (subjects) {
      const filteredSubjectTitles = subjects.filter((subject) =>
        subject.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredSubjectTitles);
    }
  }, [subjects, searchQuery]);


  const handleClickOutside = (event: MouseEvent) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
      setIsSearchFocused(false);
    }
  };

  const handleSubjectClick = (clickedSubject: ISubject) => {
    setSearchQuery(clickedSubject.title);
    setSubjectId(clickedSubject.id);
    setIsSearchFocused(false);
  };

  return (
    <div className='lesson-creation-page'>
      <div className='lesson-creation-page-header'>
        <h1 className='lesson-creation-page-header-title'>Add New Lesson</h1>
        <Link to='/lessons' className='link'>
          <img src={Close} alt='close-button-icon' className='lesson-creation-page-header-close-button' />
        </Link>
      </div>
      <div className='lesson-creation-page-creation-form'>
        <div className='lesson-creation-page-title-and-subject-section'>
          <div className='lesson-creation-page-title-and-subject-input'>
            <label htmlFor='lesson-creation-page-lesson-title'
                   className='lesson-creation-page-title-and-subject-input-label'>Title</label>
            <input
              id='lesson-creation-page-lesson-title'
              type='text'
              value={lessonTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLessonTitle(e.target.value)}
              className='lesson-creation-page-title-and-subject-input-field'
              autoComplete={'off'}
            />
          </div>
          <div className='lesson-creation-page-title-and-subject-input' ref={searchInputRef}>
            <label htmlFor='lesson-creation-page-subject-titles'
                   className='lesson-creation-page-title-and-subject-input-label'>Subject</label>
            <input
              id='lesson-creation-page-subject-titles'
              type='text'
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onClick={() => setIsSearchFocused(true)}
              className='lesson-creation-page-title-and-subject-input-field'
              autoComplete={'off'}
            />
            {isSearchFocused && filteredData && (
              <div className='lesson-creation-page-subject-titles-list-wrapper'>
                <ul className='lesson-creation-page-subject-titles-list'>
                  {filteredData.map(subject => (
                    <li
                      key={subject.id}
                      onClick={() => handleSubjectClick(subject)}
                      className='lesson-creation-page-subject-title'
                    >
                      {subject.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className='lesson-creation-page-lesson-data-editor'>
          <label htmlFor='lesson-creation-lesson-data' className='lesson-creation-page-title-and-subject-input-label'>Lesson
            Data</label>
          <div className='lesson-creation-page-lesson-editor'>
            <ReactQuill
              id='lesson-creation-lesson-data'
              theme={'snow'}
              value={lessonData}
              onChange={(value) => setLessonData(value)}
              className='lesson-creation-page-lesson-editor-field'
            />
          </div>
        </div>
        <button onClick={handleActionOnLesson} className='lesson-creation-page-button-create'>{buttonTitle ? buttonTitle : 'Create'}</button>
      </div>
    </div>
  );
}

export default LessonCreation;