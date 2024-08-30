import React , {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../images/school_logo_5.svg';

const SideBar = () => {
  const  userRole = localStorage.getItem('userRole');
  
  return (
    <div className={`side-bar`}>
      <img src={Logo} className="logo" />
      <ul>
        <li><NavLink to={`${userRole === 'admin' ? 'dashboard' : 'dashboard'}`}>Dashboard</NavLink></li>
        <li><NavLink to={`${userRole === 'admin' ? 'exams' : 'exams'}`}>Exams</NavLink></li>
        {userRole === 'admin' &&<li><NavLink to="teachers">Teachers</NavLink></li>}
        {userRole === 'admin' &&<li><NavLink to="students">Students</NavLink></li>}
      </ul>
    </div>
  )
}

export default SideBar