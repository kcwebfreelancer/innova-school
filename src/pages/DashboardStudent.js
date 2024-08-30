import React from 'react'

const DashboardStudent = () => {
    let userRole = localStorage.getItem('userRole');
    return (
        <div className='dashboard'>
             <p>DashboardStudent </p>
        </div >
    )
}

export default DashboardStudent