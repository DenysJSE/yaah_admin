import './SubjectDetails.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';
import { useEffect, useState } from 'react';
import SubjectService from 'services/SubjectService.ts';
import { ISubject } from 'pages/subjects/Subjects.tsx';
import { quantum } from 'ldrs';
import closeButton from 'assets/images/close.png';
import moreInfo from 'assets/images/info-button.png';
import editIcon from 'assets/images/edit.png';
import deleteIcon from 'assets/images/delete.png';
import ModalWindow from 'components/ModalWindow.tsx';
import { toast } from 'react-toastify';

function SubjectDetails() {
  const { id } = useParams();
  const [subject, setSubject] = useState<ISubject | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShowDeleteSubjectDialog, setIsShowDeleteSubjectDialog] = useState(false);
  const navigate = useNavigate();
  quantum.register();

  useEffect(() => {
    const fetchSubjectByID = async () => {
      try {
        if (id) {
          const response = await SubjectService.getSubjectById(parseInt(id));
          setSubject(response.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchSubjectByID();
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

  if (!subject) {
    return <NotFoundPage extraMessage={'The subject with such id do not exist'} />;
  }

  const handleBack = () => {
    navigate('/subjects');
  };

  const linkToExam = (id: number) => {
    navigate(`/exams/${id}`);
  };

  const linkToLesson = (id: number) => {
    navigate(`/lessons/${id}`, {state: {source: 'subjectDetails'}});
  };

  async function handleDeleteSubject(id: number) {
    try {
      await SubjectService.deleteSubject(id);
      navigate('/subjects');
      toast.success('The subject was deleted successfully');
    } catch (e) {
      console.log(e);
    }
  }

  const handleShowDeleteSubjectDialog = () => {
    setIsShowDeleteSubjectDialog(true);
  };

  const handleCanselDelete = () => {
    setIsShowDeleteSubjectDialog(false);
  };

  return (
    <div className='subject-details-page'>
      <div className='subject-details-page-header'>
        <h1>Subject Details</h1>
        <img
          src={closeButton}
          alt='close-button'
          className='subject-details-page-header-button'
          onClick={handleBack}
        />
      </div>
      <div className='subject-details-page-content'>
        <div className='subject-details-page-content-main-info'>
          <p className='subject-details-page-content-main-info-title'><b>Title:</b> {subject?.title}</p>
          <p className='subject-details-page-content-main-info-description'><b>Description:</b> {subject.description}
          </p>
          <p className='subject-details-page-content-main-info-amount'><b>Lessons Amount:</b> {subject.lessonsNumber}
          </p>
          <p className='subject-details-page-content-main-info-amount'><b>Exams Amount:</b> {subject.examsNumber}</p>
        </div>
        <div className='subject-details-page-content-exams_lessons'>
          <div className='subject-details-page-content-exams'>
            <h2 className='subject-details-page-content-title'>Subject Exams List</h2>
            {subject.examsNumber > 0 ?
              <div className='subject-details-page-content-exams-cards'>
                {subject.exams.map(exam => (
                  <div className='subject-details-page-content-exams-card' key={exam.ID}>
                    <p>{exam.title}</p>
                    <img
                      src={moreInfo}
                      alt='details-about-exam'
                      className='subject-details-page-content-exams-card-more'
                      onClick={() => linkToExam(exam.ID)}
                    />
                  </div>
                ))}
              </div>
              :
              <p className='subject-details-page-content-exams-no-exams-message'>This subject do not have exams yet</p>
            }
          </div>
          <div className='subject-details-page-content-lessons'>
            <h2 className='subject-details-page-content-title'>Subject Lessons List</h2>
            {subject.lessonsNumber > 0 ?
              <div className='subject-details-page-content-exams-cards'>
                {subject.lessons.map(lesson => (
                  <div className='subject-details-page-content-exams-card' key={lesson.id}>
                    <p>{lesson.title}</p>
                    <img
                      src={moreInfo}
                      alt='details-about-lesson'
                      className='subject-details-page-content-exams-card-more'
                      onClick={() => linkToLesson(lesson.id)}
                    />
                  </div>
                ))}
              </div>
              :
              <p className='subject-details-page-content-exams-no-exams-message'>This subject do not have exams yet</p>
            }
          </div>
        </div>
      </div>
      <div className='subject-details-page-buttons'>
        <Link to={`/edit-subject/${id}`} className='link'>
          <button className='subject-details-page-button edit'>
            <img src={editIcon} alt='edit-subject-img' className='subject-details-page-button-icon' />
            Edit
          </button>
        </Link>
        <button className='subject-details-page-button delete' onClick={handleShowDeleteSubjectDialog}>
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

export default SubjectDetails;