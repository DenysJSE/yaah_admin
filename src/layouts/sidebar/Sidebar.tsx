import Logo from '../../assets/images/Logo.png'
import Lesson from '../../assets/images/lessons.png'
import LessonActive from '../../assets/images/lessons_active.png'
import Exam from '../../assets/images/exam.png'
import ExamActive from '../../assets/images/exam_active.png'
import Subject from '../../assets/images/subject.png'
import SubjectActive from '../../assets/images/subjects_active.png'
import User from '../../assets/images/user.png'
import UserActive from '../../assets/images/user_active.png'
import ShowSidebar from '../../assets/images/show_menu.png'
import HideSidebar from '../../assets/images/hide_menu.png'
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useEffect } from 'react';
import { useSidebarContext } from '../../context/HideSidebarContext.tsx';


function Sidebar() {
  const { isSidebarHidden, toggleSidebar } = useSidebarContext();

  useEffect(() => {
    localStorage.setItem('isHidden', JSON.stringify(isSidebarHidden));
  }, [isSidebarHidden]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 850) {
        toggleSidebar(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [toggleSidebar]);

  return (
    <div className={`sidebar ${isSidebarHidden && 'sidebar-hidden' } `}>
      <div className='sidebar-top'>
        <div className='sidebar-logo'>
          <img src={Logo} alt='Logo' className='sidebar-logo-image' />
          {!isSidebarHidden && <h1 className='sidebar-logo-title'>aah</h1>}
        </div>
        <hr className='sidebar-line' />
        <div className='sidebar-menu'>
          <div className='sidebar-top-menu'>
            <div className='sidebar-sub-menu'>
              <div className='sidebar-sub-menu-list'>
                <NavLink to={'/lessons'} className='link'>
                  {({ isActive }) => (
                    <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
                      <img
                        src={ isActive ? LessonActive : Lesson }
                        alt='lessons'
                        className='sidebar-menu-image'
                      />
                      {!isSidebarHidden && <h3 className='sidebar-link-title'>Lessons</h3>}
                    </div>
                  )}
                </NavLink>
                <NavLink to={'/exams'} className='link'>
                  {({ isActive }) => (
                    <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
                      <img
                        src={ isActive ? ExamActive : Exam }
                        alt='exams'
                        className='sidebar-menu-image'
                      />
                      {!isSidebarHidden && <h3 className='sidebar-link-title'>Exams</h3>}
                    </div>
                  )}
                </NavLink>
                <NavLink to={'/subjects'} className='link'>
                  {({ isActive }) => (
                    <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
                      <img
                        src={ isActive ? SubjectActive : Subject }
                        alt='exams'
                        className='sidebar-menu-image'
                      />
                      {!isSidebarHidden && <h3 className='sidebar-link-title'>Subjects</h3>}
                    </div>
                  )}
                </NavLink>
                <NavLink to={'/users'} className='link'>
                  {({ isActive }) => (
                    <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
                      <img
                        src={ isActive ? UserActive : User }
                        alt='exams'
                        className='sidebar-menu-image'
                      />
                      {!isSidebarHidden && <h3 className='sidebar-link-title'>Users</h3>}
                    </div>
                  )}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sidebar-hide-button'>
        {isSidebarHidden ?
          <img src={ShowSidebar} alt='show-menu' onClick={() => toggleSidebar(false)} className='sidebar-hide-button-icon' /> :
          <div className='sidebar-hide-button-hide-block' onClick={() => toggleSidebar(true)}>
            <img src={HideSidebar} alt='hide-menu' className='sidebar-hide-button-icon' />
            <p className='sidebar-hide-button-hide-block-text'>Hide Sidebar</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Sidebar;
