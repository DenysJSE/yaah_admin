import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { quantum } from 'ldrs';

import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';
import SubjectService from 'services/SubjectService.ts';
import { ISubject } from 'types/SubjectTypes.ts';
import LoadingComponent from 'components/loadingComponent.tsx';
import SubjectCreation from 'pages/subjects/components/subject-creation/SubjectCreation.tsx';

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
    return <LoadingComponent />
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
    <SubjectCreation
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      handleActionOnSubject={handleUpdateSubject}
      buttonTitle={'Update'}
    />
  );
}

export default EditSubject