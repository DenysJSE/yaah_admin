import Logo from '../../assets/images/Logo.png'
import Lesson from '../../assets/images/lessons.png'
import LessonActive from '../../assets/images/lessons_active.png'
import Exam from '../../assets/images/exam.png'
import ExamActive from '../../assets/images/exam_active.png'
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-top'>
        <div className='sidebar-logo'>
          <img src={Logo} alt='Logo' className='sidebar-logo-image' />
          <h1 className='sidebar-logo-title'>aah</h1>
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
                      <h3 className='sidebar-link-title'>Lessons</h3>
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
                      <h3 className='sidebar-link-title'>Exams</h3>
                    </div>
                  )}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
