import '../add-new-subject/AddNewSubject.css'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { quantum } from 'ldrs';

import Close from 'assets/images/close.png';
import { ISubject } from 'pages/subjects/Subjects.tsx';
import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';
import SubjectService from 'services/SubjectService.ts';

function EditSubject() {
  const { id } = useParams();
  const [subject, setSubject] = useState<ISubject | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(subject?.title);
  const [description, setDescription] = useState(subject?.description);
  const navigate = useNavigate()
  quantum.register();

  useEffect(() => {
    setTitle(subject?.title);
    setDescription(subject?.description)
  }, [subject?.title, subject?.description]);

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

  const handleUpdateSubject = async () => {
    try {
      if (title && description) {
        await SubjectService.updateSubjectData(parseInt(id), {title, description})
        toast.success('The subject was updated successfully')
        navigate(`/subject-details/${parseInt(id)}`)
      } else {
        toast.error('The title or description field is not filled!')
      }
    } catch (e: any) {
      if (e.response && e.response.data && Array.isArray(e.response.data.message)) {
        e.response.data.message.forEach((errorMessage: any) => {
          toast.error(errorMessage);
        });
      } else if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error('An error occurred');
      }
    }
  }

  return (
    <div className='add-new-subject-page'>
      <div className='add-new-subject-page-header'>
        <h1 className='add-new-subject-page-header-title'>Update Subject</h1>
        <Link to={`/subject-details/${parseInt(id)}`} className='link'>
          <img src={Close} alt='close-button-icon' className='add-new-subject-page-header-close-button' />
        </Link>
      </div>
      <div className='add-new-subject-page-content'>
        <div className='add-new-subject-page-input'>
          <label htmlFor='add-new-subject-title' className='add-new-subject-page-input-label'>Title</label>
          <input
            id='add-new-subject-title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='add-new-subject-page-input-field'
          />
        </div>
        <div className='add-new-subject-page-input'>
          <label htmlFor='add-new-subject-description' className='add-new-subject-page-input-label'>Description</label>
          <textarea
            id='add-new-subject-description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='add-new-subject-page-input-field textarea'
          />
        </div>
        <button onClick={handleUpdateSubject} className='add-new-subject-page-button-create'>Update</button>
      </div>
    </div>
  );
}

export default EditSubject