import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import LessonsService from 'services/LessonsService.ts';
import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';
import { ILesson } from 'types/LessonTypes.ts';
import LessonCreation from 'pages/lessons/components/lesson-creation/LessonCreation.tsx';

function EditLesson() {
  const {id } = useParams();
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<ILesson | null>(null);

  //similar with add new lesson
  const [subjectId, setSubjectId] = useState<number>(lesson?.subject.id || 0);
  const [lessonTitle, setLessonTitle] = useState(lesson?.title || '');
  const [lessonData, setLessonData] = useState(lesson?.lessonData || '')
  const [searchQuery, setSearchQuery] = useState(lesson?.subject.title || '');
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
    <LessonCreation
      lessonTitle={lessonTitle}
      setLessonTitle={setLessonTitle}
      lessonData={lessonData}
      setLessonData={setLessonData}
      setSubjectId={setSubjectId}
      searchQueryOption={searchQuery}
      handleActionOnLesson={handleUpdateLesson}
      buttonTitle='Update'
    />
  );
}

export default EditLesson;