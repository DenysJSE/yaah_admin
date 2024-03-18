import './SubjectCreation.css';

import { Link } from 'react-router-dom';

import Close from 'assets/images/close.png';
import { ISubjectCreation } from 'types/SubjectTypes.ts';

function SubjectCreation(
  {
    title,
    setTitle,
    description,
    setDescription,
    handleActionOnSubject,
    buttonTitle
  }: ISubjectCreation) {
  return (
    <div className='subject-creation-page'>
      <div className='subject-creation-page-header'>
        <h1 className='subject-creation-page-header-title'>Add New Subject</h1>
        <Link to={'/subjects'} className='link'>
          <img src={Close} alt='close-button-icon' className='subject-creation-page-header-close-button' />
        </Link>
      </div>
      <div className='subject-creation-page-content'>
        <div className='subject-creation-page-input'>
          <label htmlFor='subject-creation-page-label-title' className='subject-creation-page-input-label'>Title</label>
          <input
            id='subject-creation-page-label-title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='subject-creation-page-input-field'
          />
        </div>
        <div className='subject-creation-page-input'>
          <label htmlFor='subject-creation-page-label-description'
                 className='subject-creation-page-input-label'>Description</label>
          <textarea
            id='subject-creation-page-label-description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='subject-creation-page-input-field textarea'
          />
        </div>
        <button onClick={handleActionOnSubject}
                className='subject-creation-page-button-create'>{buttonTitle ? buttonTitle : 'Create'}</button>
      </div>
    </div>
  );
}

export default SubjectCreation;