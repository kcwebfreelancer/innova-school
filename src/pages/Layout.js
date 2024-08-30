import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import { useUtils } from '../contextapi/UtilsAuth';

const Layout = () => {
  const { sideBarToggle } = useUtils();
  const [admin, setAdmin] = useState(localStorage.getItem("userRole") === "admin" ? true : null);
  return (
    <div className={`container-fluid no-padding ${sideBarToggle ? 'side-bar-collapsed' : 'side-bar-expanded'}`}>
      <div className='side-bar-container'>
        <SideBar />
      </div>
      <div className='right-column-container'>
        <Header />
        <div>
          {admin ? <Outlet /> : <Navigate to="/"/> }
        </div>
      </div>
    </div>
  )
}

export default Layout