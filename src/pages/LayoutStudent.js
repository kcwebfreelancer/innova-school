import React, { useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import { useUtils } from '../contextapi/UtilsAuth';

const LayoutStudent = () => {
    const { sideBarToggle } = useUtils();
    const [student, setStudent] = useState(localStorage.getItem("userRole") === "student" ? true : null);
    return (
        <div className={`container-fluid no-padding ${sideBarToggle ? 'side-bar-collapsed' : 'side-bar-expanded'}`}>
            <div className='side-bar-container'>
                <SideBar />
            </div>
            <div className='right-column-container'>
                <Header />
                <div>
                    {student ? <Outlet /> : <Navigate to="/" />}
                </div>
            </div>
        </div>
    )
}

export default LayoutStudent