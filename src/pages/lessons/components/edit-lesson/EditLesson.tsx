import '../add-new-lesson/AddNewLesson.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ILesson } from 'pages/lessons/Lessons.tsx';
import LessonsService from 'services/LessonsService.ts';
import Close from 'assets/images/close.png';
import ReactQuill from 'react-quill';
import { ISubject } from 'pages/subjects/Subjects.tsx';
import { toast } from 'react-toastify';
import SubjectService from 'services/SubjectService.ts';


// TODO: Change this file and AddNewLesson (I duplicated the code)
function EditLesson() {
  const {id } = useParams();
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [lessonTitle, setLessonTitle] = useState(lesson?.title || '');
  const [subjects, setSubjects] = useState<ISubject[] | null>(null);
  const [subjectId, setSubjectId] = useState<number>(lesson?.subject.id || 0);
  const [lessonData, setLessonData] = useState(lesson?.lessonData || '')
  const [searchQuery, setSearchQuery] = useState(lesson?.subject.title || '');
  const [filteredData, setFilteredData] = useState<ISubject[] | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLessonByID = async () => {
      try {
        if (id) {
          const response = await LessonsService.getLessonById(parseInt(id));
          setLesson(response.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchLessonByID();
    }
  }, [id]);

  useEffect(() => {
    if (lesson) {
      setLessonTitle(lesson.title || '');
      setLessonData(lesson.lessonData || '');
      setSearchQuery(lesson.subject?.title || '');
      setSubjectId(lesson.subject.id || 0);
    }
  }, [lesson]);

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

  if (!id) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <div className='lesson-component-loading'>
      <l-quantum
        size='55'
        speed='2'
        color='#B9C7FC'
      />
    </div>;
  }

  if (!lesson) {
    return <NotFoundPage extraMessage={'The lesson with such id do not exist'} />;
  }

  const handleSubjectClick = (clickedSubject: ISubject) => {
    setSearchQuery(clickedSubject.title);
    setSubjectId(clickedSubject.id);
    setIsSearchFocused(false);
  };

  const updateLesson = async () => {
    const title = lessonTitle
    const award = lesson.award
    await LessonsService.updateLesson(parseInt(id), {title, lessonData, subjectId, award})
  }

  const handleUpdateLesson = async () => {
    try {
      await updateLesson()
      toast.success('The lesson was updated successfully')
      navigate('/lessons')
    } catch (e: any) {
      if (e.response && e.response.data && Array.isArray(e.response.data.message)) {
        e.response.data.message.forEach((errorMessage: any) => {
          toast.error(errorMessage);
        });
      } else if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error('An error occurred!');
      }
    }
  }

  return (
    <div className='add-new-lesson-page'>
      <div className='add-new-lesson-page-header'>
        <h1 className='add-new-lesson-page-header-title'>Add New Lesson</h1>
        <Link to='/lessons' className='link'>
          <img src={Close} alt='close-button-icon' className='add-new-lesson-page-header-close-button' />
        </Link>
      </div>
      <div className='add-new-lesson-page-content'>
        <div className='add-new-lesson-page-title-subject-inputs'>
          <div className='add-new-lesson-page-input'>
            <label htmlFor='add-new-lesson-title' className='add-new-lesson-page-input-label'>Title</label>
            <input
              id='add-new-lesson-title'
              type='text'
              value={lessonTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLessonTitle(e.target.value)}
              className='add-new-lesson-page-input-field'
              autoComplete={'off'}
            />
          </div>
          <div className='add-new-lesson-page-input' ref={searchInputRef}>
            <label htmlFor='add-new-lesson-title-subject' className='add-new-lesson-page-input-label'>Subject</label>
            <input
              id='add-new-lesson-title-subject'
              type='text'
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onClick={() => setIsSearchFocused(true)}
              className='add-new-lesson-page-input-field'
              autoComplete={'off'}
            />
            {isSearchFocused && filteredData && (
              <div className='add-new-lesson-title-subject-list-wrapper'>
                <div className='add-new-lesson-title-subject-list-position'>
                  <ul className='add-new-lesson-title-subject-list'>
                    {filteredData.map(subject => (
                      <li
                        key={subject.id}
                        onClick={() => handleSubjectClick(subject)}
                        className='add-new-lesson-title-subject-list-item'
                      >
                        {subject.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='add-new-lesson-page-lesson-data-editor'>
          <label htmlFor='add-new-lesson-data' className='add-new-lesson-page-input-label'>Lesson Data</label>
          <div className='add-new-lesson-page-lesson-editor'>
            <ReactQuill
              id='add-new-lesson-data'
              theme={'snow'}
              value={lessonData}
              onChange={(value) => setLessonData(value)}
              className='add-new-lesson-page-lesson-editor-field'
            />
          </div>
        </div>
        <button onClick={handleUpdateLesson} className='add-new-lesson-page-button-create'>Update</button>
      </div>
    </div>
  );
}

export default EditLesson;