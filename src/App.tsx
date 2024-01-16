import './assets/Global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './layouts/sidebar/Sidebar.tsx';
import Header from './layouts/header/Header.tsx';
import { useSidebarContext } from './context/HideSidebarContext.tsx';
import Lessons from './pages/lessons/Lessons.tsx';
import Exams from './pages/exams/Exams.tsx';
import Subjects from './pages/subjects/Subjects.tsx';
import Users from './pages/users/Users.tsx';
import Profile from './pages/profile/Profile.tsx';
import NotFoundPage from './pages/not-found-page/NotFoundPage.tsx';
import { createContext } from 'react';
import userStore from './store/user/userStore.tsx';
import AuthPage from './pages/auth/AuthPage.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import { useUser } from './components/UserUtils.ts';
import EditProfileCard from './pages/profile/components/edit-profile-card/EditProfileCard.tsx';

export const Context = createContext({
  store: userStore
});

function App() {
  const { isSidebarHidden } = useSidebarContext();
  const { user } = useUser();

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
                <Route path={'/exams'} element={<Exams />} />
                <Route path={'/subjects'} element={<Subjects />} />
                <Route path={'/users'} element={<Users />} />
                <Route path={'/profile'} element={<Profile />} />
                <Route path={'/edit-profile'} element={<EditProfileCard user={user} />} />
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
