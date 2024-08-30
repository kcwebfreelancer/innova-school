import React from 'react';
import placeHolder from '../images/student_placeholder-01-01.jpg';
import {useNavigate, Link} from 'react-router-dom';

const StudentsList = ({ students, handleEditStudent, handleDeleteStudent, handleGetStudentDetails }) => {
    let navigate = useNavigate();
    return (
        <>
            {
                students && students.map(student => {
                    return (
                        <li key={student._id}>
                            {!student.photo ? <img src={placeHolder} /> : <img src={require(`../../images/${student.photo}`)} />}
                            <h4>{student.name}</h4>
                            <h5>{student.grade}, {student.section}</h5>
                            <div className="action-icons">
                                <div className="icon-details" title='Details' onClick={() => handleGetStudentDetails(student._id)}><i className='fa fa-info-circle'></i></div>
                                <div className="icon-edit" title='Edit' onClick={() => navigate(`update/${student._id}`)}><i className='fa fa-pencil'></i></div>
                                <div className="icon-delete" title='Delete' onClick={() => handleDeleteStudent(student._id)}><i className='fa fa-trash'></i></div>
                            </div>
                        </li>)
                })
            }
        </>
    )
}

export default StudentsList