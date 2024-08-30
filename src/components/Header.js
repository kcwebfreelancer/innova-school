import React, { useContext, useState } from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useTheme } from '../contextapi/ThemeContext';
import { useAuth } from '../contextapi/AuthContext';
import { useUtils } from '../contextapi/UtilsAuth';
import '../thirdparty/font-awesome-4.7.0/css/font-awesome.min.css';
import Logo from '../images/school_logo_5.svg';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Login from './Login/Login';
import ForgotPassword from './Login/ForgotPassword';
import Signup from './Login/Signup';

const Header = () => {
  const [formType, setFormType] = useState({
    login: true,
    forgot_password: false,
    sign_up: false
  });
  const [showModal, setShowModal] = useState(false);
  const { sideBarToggle, sideBarToggleFn } = useUtils();
  const { theme } = useTheme();
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const getTheme = localStorage.getItem('theme');
  const userRole = localStorage.getItem('userRole');
  
  const handleToggleSideBar = () => {
    sideBarToggleFn(sideBarToggle);
  }
  const handleLogout = () => {
    logout(localStorage.setItem('userRole', ''));
    navigate('/');
  }
  const handleModalShow = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  }

  return (
    <>
      <div className={`school-header ${getTheme}`}>
        <Container fluid className={`${userRole.length > 0 ? 'logged-in-container' : ''}`}>
          {userRole.length > 0 ? null : <img src={Logo} className="logo" />}
          {
            userRole.length > 0 ?
            (<><button onClick={handleToggleSideBar}><i className='fa fa-bars'></i></button>
            <div className='loggedInUser'>Welcome, <strong>{userRole === 'admin' ? 'Admin' : 'Student'}!</strong></div></>)
            : null
          }
          <div className='school-navigation'>
            {userRole.length > 0 ? null : <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/">Academics</NavLink></li>
              <li><NavLink to="/">Campus</NavLink></li>
              <li><NavLink to="/">Admissions</NavLink></li>
              <li><NavLink to="/">Gallery</NavLink></li>
            </ul>}
            {userRole.length > 0 ? <div className="link-login" onClick={handleLogout}>Logout</div> : <div className="link-login" onClick={handleModalShow}>Login</div>}
          </div>
        </Container>
      </div>
      <Modal show={showModal} onHide={handleModalClose} backdrop="static" className="login-modal" size="500">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {formType.login && <Login setFormType={setFormType} formType={formType} />}
          {formType.forgot_password && <ForgotPassword setFormType={setFormType} formType={formType} />}
          {formType.sign_up && <Signup setFormType={setFormType} formType={formType} />}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Header