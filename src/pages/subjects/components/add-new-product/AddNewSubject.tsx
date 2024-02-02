import './AddNewSubject.css'
import SubjectService from 'services/SubjectService.ts';
import Close from 'assets/images/close.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddNewSubject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()

  const createNewSubject = async () => {
    await SubjectService.createNewSubject({title, description})
  }

  const handleCreateSubject = async () => {
    try {
      await createNewSubject()
      toast.success('The subject was created successfully')
      navigate('/subjects')
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
        <h1 className='add-new-subject-page-header-title'>Add New Subject</h1>
        <Link to={'/subjects'} className='link'>
          <img src={Close} alt='close-button-icon' className='add-new-subject-page-header-close-button' />
        </Link>
      </div>
      <div className='add-new-subject-page-content'>
        <div className='add-new-subject-page-input'>
          <label htmlFor='add-new-subject-title' className='add-new-subject-page-input-label'>Title</label>
          <input
            id='add-new-subject-title'
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            className='add-new-subject-page-input-field'
          />
        </div>
        <div className='add-new-subject-page-input'>
          <label htmlFor='add-new-subject-description' className='add-new-subject-page-input-label'>Description</label>
          <textarea
            id='add-new-subject-description'
            onChange={(e) => setDescription(e.target.value)}
            className='add-new-subject-page-input-field textarea'
          />
        </div>
        <button onClick={handleCreateSubject} className='add-new-subject-page-button-create'>Create</button>
      </div>
    </div>
  );
}

export default AddNewSubject