import './assets/Global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';

import Sidebar from 'layouts/sidebar/Sidebar.tsx';
import Header from 'layouts/header/Header.tsx';

import userStore from 'store/user/userStore.tsx';
import { useSidebarContext } from './context/HideSidebarContext.tsx';

import PrivateRoute from 'components/PrivateRoute.tsx';

import Lessons from 'pages/lessons/Lessons.tsx';
import EditLesson from 'pages/lessons/components/edit-lesson/EditLesson.tsx';
import AddNewLesson from 'pages/lessons/components/add-new-lesson/AddNewLesson.tsx';
import LessonDetails from 'pages/lessons/components/lesson-details/LessonDetails.tsx';

import Exams from 'pages/exams/Exams.tsx';

import Subjects from 'pages/subjects/Subjects.tsx';
import AddNewSubject from 'pages/subjects/components/add-new-subject/AddNewSubject.tsx';
import EditSubject from 'pages/subjects/components/edit-subject/EditSubject.tsx';
import SubjectDetails from 'pages/subjects/components/subject-details/SubjectDetails.tsx';

import AuthPage from 'pages/auth/AuthPage.tsx';

import Users from 'pages/users/Users.tsx';
import Profile from 'pages/profile/Profile.tsx';
import EditProfileCard from 'pages/profile/components/edit-profile-card/EditProfileCard.tsx';

import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';

export const Context = createContext({
  store: userStore
});

function App() {
  const { isSidebarHidden } = useSidebarContext();

  // TODO: fix this line as I do with lessonDetails
  const [path, setPath] = useState('profile');

  return (
    <BrowserRouter>
      <div className='App'>
        <div className='app-sidebar'>
          <Sidebar />
        </div>
        <div className={`app-content ${isSidebarHidden ? 'app-content-sidebar-hidden' : ''}`}>
          <Header />
          <div className={`app-page ${isSidebarHidden ? 'app-page-sidebar-hidden' : ''}`}>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path={'/lessons'} element={<Lessons />} />
                <Route path={'/lessons/:id'} element={<LessonDetails />} />
                <Route path={'/lessons/edit-lesson/:id'} element={<EditLesson />} />
                <Route path={'/add-new-lesson'} element={<AddNewLesson />} />
                <Route path={'/exams'} element={<Exams />} />
                <Route path={'/subjects'} element={<Subjects />} />
                <Route path={'/add-new-subject'} element={<AddNewSubject />} />
                <Route path={'/edit-subject/:id'} element={<EditSubject />} />
                <Route path={'/subject-details/:id'} element={<SubjectDetails />} />
                <Route path={'/users'} element={<Users setPath={setPath} />} />
                <Route path={'/profile'} element={<Profile setPath={setPath} />} />
                <Route path={'/edit-profile/:id'} element={<EditProfileCard path={path} />} />
              </Route>
              <Route path={'/'} element={<AuthPage />} />
              <Route path={'/*'} element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
