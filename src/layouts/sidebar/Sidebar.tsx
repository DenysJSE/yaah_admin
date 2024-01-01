import Logo from '../../assets/images/Logo.png'
import Lesson from '../../assets/images/lessons.png'
import LessonActive from '../../assets/images/lessons_active.png'
import Exam from '../../assets/images/exam.png'
import ExamActive from '../../assets/images/exam_active.png'
import Subject from '../../assets/images/subject.png'
import User from '../../assets/images/user.png'
import ShowSidebar from '../../assets/images/show_menu.png'
import HideSidebar from '../../assets/images/hide_menu.png'
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useState } from 'react';

function Sidebar() {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className={`sidebar ${isHidden && 'sidebar-hidden' } `}>
      <div className='sidebar-top'>
        <div className='sidebar-logo'>
          <img src={Logo} alt='Logo' className='sidebar-logo-image' />
          {!isHidden && <h1 className='sidebar-logo-title'>aah</h1>}
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
                      {!isHidden && <h3 className='sidebar-link-title'>Lessons</h3>}
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
                      {!isHidden && <h3 className='sidebar-link-title'>Exams</h3>}
                    </div>
                  )}
                </NavLink>
                <NavLink to={'/subjects'} className='link'>
                  {({ isActive }) => (
                    <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
                      <img
                        src={Subject}
                        alt='exams'
                        className='sidebar-menu-image'
                      />
                      {!isHidden && <h3 className='sidebar-link-title'>Subjects</h3>}
                    </div>
                  )}
                </NavLink>
                <NavLink to={'/users'} className='link'>
                  {({ isActive }) => (
                    <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
                      <img
                        src={User}
                        alt='exams'
                        className='sidebar-menu-image'
                      />
                      {!isHidden && <h3 className='sidebar-link-title'>Users</h3>}
                    </div>
                  )}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sidebar-hide-button'>
        {isHidden ?
          <img src={ShowSidebar} alt='show-menu' onClick={() => setIsHidden(false)} className='sidebar-hide-button-icon' /> :
          <div className='sidebar-hide-button-hide-block' onClick={() => setIsHidden(true)}>
            <img src={HideSidebar} alt='hide-menu' className='sidebar-hide-button-icon' />
            <p className='sidebar-hide-button-hide-block-text'>Hide Sidebar</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Sidebar;
