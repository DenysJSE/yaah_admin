import './LessonDetails.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';
import LessonsService from 'services/LessonsService.ts';
import { ILesson } from 'pages/lessons/Lessons.tsx';
import closeButton from 'assets/images/close.png';
import editIcon from 'assets/images/edit.png';
import deleteIcon from 'assets/images/delete.png';
import ModalWindow from 'components/ModalWindow.tsx';

function LessonDetails() {
  const { id } = useParams();
  const location = useLocation();
  const source = location.state?.source || 'lessons';
  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShowDeleteSubjectDialog, setIsShowDeleteSubjectDialog] = useState(false);
  const navigate = useNavigate();

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
    };
    if (id) {
      fetchLessonByID();
    }
  }, [id]);

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

  const handleBack = () => {
    if (source === 'subjectDetails') {
      navigate(`/subject-details/${lesson.subject.id}`);
    } else {
      navigate('/lessons');
    }
  };

  const handleShowDeleteSubjectDialog = () => {
    setIsShowDeleteSubjectDialog(true);
  };

  const handleCanselDelete = () => {
    setIsShowDeleteSubjectDialog(false);
  };

  const handleDeleteSubject = async (id: number) => {
    try {
      await LessonsService.deleteLesson(id);
      navigate('/lessons');
    } catch (e) {
      console.log(e);
    } finally {
      setIsShowDeleteSubjectDialog(false);
    }
  };

  return (
    <div className='lesson-details-page-lesson-wrapper'>
      <div className='lesson-details-page'>
        <div className='lesson-details-page-header'>
          <h1>{lesson.title}</h1>
          <h2><i>{lesson.subject.title}</i></h2>
          <img
            src={closeButton}
            alt='close-button'
            className='lesson-details-page-header-button'
            onClick={handleBack}
          />
        </div>
        <div className='lesson-component-data' dangerouslySetInnerHTML={{ __html: lesson.lessonData }} />
      </div>
      <div className='lesson-details-page-buttons'>
        <Link to={`/lessons/edit-lesson/${id}`} className='link'>
          <button className='lesson-details-page-button edit'>
            <img src={editIcon} alt='edit-subject-img' className='subject-details-page-button-icon' />
            Edit
          </button>
        </Link>
        <button className='lesson-details-page-button delete' onClick={handleShowDeleteSubjectDialog}>
          <img src={deleteIcon} alt='delete-subject-img' className='subject-details-page-button-icon' />
          Delete
        </button>
      </div>
      {isShowDeleteSubjectDialog &&
        <ModalWindow
          handleCansel={handleCanselDelete}
          handleDoAction={() => handleDeleteSubject(parseInt(id))}
          cancelText={'Cancel'}
          doActionText={'Delete subject'}
          modalWindowTitle={'You are trying to delete the subject'}
          modalWindowText={'Are you sure you want to delete this subject. If you do that a lot of user who love this subject will lose the opportunity to pass some exams or learn new information!'}
        />
      }
    </div>
  );
}

export default LessonDetails;