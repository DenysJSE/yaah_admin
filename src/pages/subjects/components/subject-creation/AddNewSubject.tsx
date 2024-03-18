import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SubjectService from 'services/SubjectService.ts';
import SubjectCreation from 'pages/subjects/components/subject-creation/SubjectCreation.tsx';

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
    <SubjectCreation
      setTitle={setTitle}
      setDescription={setDescription}
      handleActionOnSubject={handleCreateSubject}
    />
  );
}

export default AddNewSubject