import './LessonDetails.css';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import editIcon from 'assets/images/edit.png';
import deleteIcon from 'assets/images/delete.png';
import closeButton from 'assets/images/close.png';
import ModalWindow from 'components/ModalWindow.tsx';
import LessonsService from 'services/LessonsService.ts';
import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';
import { ILesson } from 'types/LessonTypes.ts';
import LoadingComponent from 'components/loadingComponent.tsx';

function LessonDetails() {
  const { id } = useParams();
  const location = useLocation();
  const source = location.state?.source || 'lessons';
  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShowDeleteLessonDialog, setIsShowDeleteLessonDialog] = useState(false);
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
     return <LoadingComponent />
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

  const handleShowDeleteLessonDialog = () => {
    setIsShowDeleteLessonDialog(true);
  };

  const handleCanselDelete = () => {
    setIsShowDeleteLessonDialog(false);
  };

  const handleDeleteLesson = async (id: number) => {
    try {
      await LessonsService.deleteLesson(id);
      navigate('/lessons');
    } catch (e) {
      console.log(e);
    } finally {
      setIsShowDeleteLessonDialog(false);
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
        <button className='lesson-details-page-button delete' onClick={handleShowDeleteLessonDialog}>
          <img src={deleteIcon} alt='delete-subject-img' className='subject-details-page-button-icon' />
          Delete
        </button>
      </div>
      {isShowDeleteLessonDialog &&
        <ModalWindow
          handleCansel={handleCanselDelete}
          handleDoAction={() => handleDeleteLesson(parseInt(id))}
          cancelText={'Cancel'}
          doActionText={'Delete lesson'}
          modalWindowTitle={'You are trying to delete the lesson'}
          modalWindowText={'Are you sure you want to delete this lesson. If you do that a lot of user who love this lesson will lose the opportunity to pass it!'}
        />
      }
    </div>
  );
}

export default LessonDetails;