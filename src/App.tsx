import './assets/Global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './layouts/sidebar/Sidebar.tsx';
import Header from './layouts/header/Header.tsx';
import { useSidebarContext } from './context/HideSidebarContext.tsx';
import Auth from './pages/Auth/Auth.tsx';
import Lessons from './pages/Lessons/Lessons.tsx';
import Exams from './pages/Exams/Exams.tsx';
import Subjects from './pages/Subjects/Subjects.tsx';
import Users from './pages/Users/Users.tsx';
import Profile from './pages/Profile/Profile.tsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';

function App() {
  const { isSidebarHidden } = useSidebarContext();

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
              <Route path={'/'} element={<Auth />} />
              <Route path={'/lessons'} element={<Lessons />} />
              <Route path={'/exams'} element={<Exams />} />
              <Route path={'/subjects'} element={<Subjects />} />
              <Route path={'/users'} element={<Users />} />
              <Route path={'/profile'} element={<Profile />} />
              <Route path={'/*'} element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
