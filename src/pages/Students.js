import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import BodyHeader from '../components/BodyHeader';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import StudentsList from '../components/StudentsList';
import {
    getStudentsApi,
    postStudentApi,
    deleteStudentApi,
    updateStudentApi,
    getStudentDetailsApi
} from '../redux/actions';
import { connect } from 'react-redux';
import Search2 from '../components/Search2';
import placeHolder from '../images/student_placeholder-01-01.jpg';

const StudentDetails = ({ studentDetails }) => {
    let { name, grade, section, photo, fathername, mothername, primarycontact, secondarycontact,
        dateofadmission, address1, address2, city, state, country, pincode
    } = studentDetails;
    return (
        <>
            {
                <div className='student-details'>
                    <div className='student-photo'>
                        {photo ? <img src={require(`../../images/${photo}`)} width="150" height="150" /> : <img src={placeHolder} width="150" height="150" />}

                    </div>
                    <div className='student-text'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <td>Admission Date:</td>
                                    <td>{dateofadmission}</td>
                                </tr>
                                <tr>
                                    <td>Grade/Section:</td>
                                    <td>{grade} / {section}</td>
                                </tr>
                                <tr>
                                    <td>Father's Name:</td>
                                    <td>{fathername}</td>
                                </tr>
                                <tr>
                                    <td>Mother's Name:</td>
                                    <td>{mothername}</td>
                                </tr>
                                <tr>
                                    <td>Primary Contact:</td>
                                    <td>{primarycontact}</td>
                                </tr>
                                <tr className={secondarycontact ? 'block' : 'hide'}>
                                    <td>Secondary Contact:</td>
                                    <td>{secondarycontact}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>
                                        <address>
                                            <p>{address1} </p>
                                            <p>{address2}</p>
                                            <p>{city}, {state}, {country}</p>
                                            <p>{pincode}</p>
                                        </address>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

const Students = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const studentsData = props.students.studentsList;
    const [filteredStudents, setFilteredStudents] = useState([]);
    const grades = [5, 6, 7, 8, 9, 10, 11, 12];
    const navigate = useNavigate();

    useEffect(() => {
        props.getStudents();
    }, []);

    useEffect(() => {
        setFilteredStudents(studentsData);
    }, [studentsData])

    //handle events
    const handleModalShow = () => {
        navigate('/admin/students/add');
    };
    const handleModalClose = () => {
        setShowModal(false);
    }
    const handleDeleteStudent = (studentId) => {
        props.deleteStudent(studentId);
        if (props.students.responseSuccess) {
            setShowToast(true);
        }
        props.getStudents();
    }
    const handleGetStudentDetails = (studentId) => {
        setShowModal(true);
        props.getStudentDetailsById(studentId);
    }
    const handleFilter = (e) => {
        let filterByGrade = studentsData.filter(s => s.grade === String(e.target.value));
        String(e.target.value) === '0' ? setFilteredStudents(studentsData) : setFilteredStudents(filterByGrade)
    }
    return (
        <>
            {
                window.location.pathname === '/admin/students' ?
                    <div className='container'>
                        <div className='content-body'>
                            <BodyHeader title="Students" numberOfStudents={filteredStudents.length ? filteredStudents.length : null} />
                            <div className="button-container">
                                <div className='search-section'>
                                    <Search2 studentsData={studentsData} setFilteredStudents={setFilteredStudents} />
                                    <Form.Group className='filter-section'>
                                        <Form.Label>Filter By Grade:</Form.Label>
                                        <Form.Select name="filter" onChange={handleFilter}>
                                            <option value='0'>All</option>
                                            {
                                                grades.map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <Button variant="primary" title="add-student" onClick={handleModalShow}>Add Student</Button>
                            </div>
                            <div className='content-body-container'>
                                <ul className='students'>
                                    {
                                        props.students.loading ? <p>Loading...</p> : filteredStudents.length > 0 ?
                                            <StudentsList
                                                students={filteredStudents}
                                                handleDeleteStudent={handleDeleteStudent}
                                                handleGetStudentDetails={handleGetStudentDetails}
                                            /> : <div className='no-result-found'>No results found</div>

                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    : <Outlet />
            }

            <Modal show={showModal} onHide={handleModalClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentDetails studentDetails={props.students.studentDetails} />
                </Modal.Body>
            </Modal>

            {showToast && <ToastContainer position="top-end">
                <Toast bg={props.students.isError ? 'danger' : 'success'} variant={props.students.isError ? 'danger' : 'success'} onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide={true}>
                    <Toast.Body>{props.students.responseMessage}</Toast.Body>
                </Toast>
            </ToastContainer>}

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        students: state.students
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStudents: () => dispatch(getStudentsApi()),
        addStudent: (values) => dispatch(postStudentApi(values)),
        deleteStudent: (id) => dispatch(deleteStudentApi(id)),
        updateStudent: (id) => dispatch(updateStudentApi(id)),
        getStudentDetailsById: (id) => dispatch(getStudentDetailsApi(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Students);