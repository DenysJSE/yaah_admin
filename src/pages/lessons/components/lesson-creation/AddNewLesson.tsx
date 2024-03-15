import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';

import LessonsService from 'services/LessonsService.ts';
import LessonCreation from 'pages/lessons/components/lesson-creation/LessonCreation.tsx';

function AddNewLesson() {
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonData, setLessonData] = useState('')
  const [subjectId, setSubjectId] = useState<number>(0);
  const navigate = useNavigate()

  const createNewLesson = async () => {
    const title = lessonTitle
    const award = 0
    await LessonsService.createNewLesson({title, lessonData, subjectId, award})
  }

  const handleCreateLesson = async () => {
    try {
      await createNewLesson()
      toast.success('The lesson was created successfully')
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
    <LessonCreation
      lessonTitle={lessonTitle}
      setLessonTitle={setLessonTitle}
      lessonData={lessonData}
      setLessonData={setLessonData}
      setSubjectId={setSubjectId}
      handleActionOnLesson={handleCreateLesson}
    />
  );
}

export default AddNewLesson;