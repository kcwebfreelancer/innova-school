import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStudentApi, getStudentDetailsApi, getStudentsApi } from '../redux/actions';
import BodyHeader from '../components/BodyHeader';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useParams, useNavigate } from 'react-router-dom'
import placeHolder from '../images/student_placeholder-01-01.jpg';
import CasecadingDropDown from '../components/CasecadingDropDown';

const StudentDetails = (student) => {
    let { _id, photo, name, gender, grade, section, fathername, mothername, primarycontact, secondarycontact, dateofadmission,
        address1, address2, city, state, country, pincode
    } = student.student;
    
    const [values, setValues] = useState({
        _id,
        photo,
        name,
        gender,
        grade,
        section,
        fathername,
        mothername,
        primarycontact,
        secondarycontact,
        dateofadmission,
        address1,
        address2,
        city,
        state,
        country,
        pincode
    });
    const grades = [5, 6, 7, 8, 9, 10, 11, 12];
    const sections = ['A', 'B', 'C', 'D', 'E'];
    const [validated, setValidated] = useState(false);

    const [displayPhoto, setDisplayPhoto] = useState('');
    const [toggleDisplayPhoto, setToggleDisplayPhoto] = useState(false);

    const [studentPhoto, setStudentPhoto] = useState(values.photo);
    const [selectedPhoto, setSelectedPhoto] = useState('');

    useEffect(() => {
        if (values.photo.length > 0) {
            setStudentPhoto(values.photo);
        }
    }, [])
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleUpdateStudent = (e) => {
        e.preventDefault();
        setValidated(true);

        setValues({ ...values, photo: selectedPhoto });
        //console.log(values);
        student.props.updateStudentData(values);

        if (student.props.students.responseSuccess) {
            student.showToast(true);
            setValidated(false);
            setTimeout(() => {
                navigate('/admin/students');
                student.props.getStudents();
            }, 5000)
        }
    }
    const handleKeyDown = (e) => {
        if (isNaN(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    }
    const handleEditPhotoChange = (e) => {
        let image = e.target.files[0];
        const reader = new FileReader();
        setSelectedPhoto(image.name);
        setValues({ ...values, photo: image });
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setDisplayPhoto(reader.result);
        }
        setToggleDisplayPhoto(true);
    }
    const casecadeSelectedCountry = (e, selectedValues) => {
        setValues({ ...values, [e.target.name]: selectedValues.country })
    }
    const casecadeSelectedState = (e, selectedValues) => {
        setValues({ ...values, [e.target.name]: selectedValues.state === 'Select State' ? '' : selectedValues.state })
    }
    const casecadeSelectedCity = (e, selectedValues) => {
        setValues({ ...values, [e.target.name]: selectedValues.city === 'Select City' ? '' : selectedValues.city })
    }

    let renderPhoto = () => {
        if (studentPhoto.length === 0) {
            return selectedPhoto ? <img src={displayPhoto} width="150" height="150" title="2" /> : <img src={placeHolder} width="150" height="150" title="1" />
        } else if (toggleDisplayPhoto) {
            return <img src={displayPhoto} width="150" height="150" title="2" />
        } else if(studentPhoto) {
            return <img src={require(`../../images/${studentPhoto}`)} width="150" height="150" title="3" />
        }
    }
    return (
        <>
            <Form noValidate validated={validated} encType={'multipart/form-data'}>
                <Row>
                    <Form.Label>Photo</Form.Label>
                </Row>
                <Row>
                    <Col xs={3}>
                        <div className='student-photo'>
                            {renderPhoto()}
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className='student-photo'>
                            <label className="drop-container">
                                <Form.Control type="file" accept="image/*" name="photo" onChange={handleEditPhotoChange} />
                            </label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label className='mandatory'>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter name" name="name" value={values.name} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">Please enter name</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label className='mandatory'>Gender</Form.Label>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Check disabled required inline label="Male" name="gender" type="radio" value="male" checked={values.gender === 'male'} />
                        <Form.Check disabled inline label="Female" name="gender" type="radio" value="female" checked={values.gender === 'female'} />
                        <Form.Control.Feedback type="invalid">Please select gender</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className='mandatory'>Grade</Form.Label>
                            <Form.Select required onChange={handleChange} name="grade" value={values.grade}>
                                <option value="">-Select-</option>
                                {
                                    grades.map((grade, index) => {
                                        return (<option key={index} value={grade}>{grade}</option>)
                                    })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select grade</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className='mandatory'>Section</Form.Label>
                            <Form.Select onChange={handleChange} name="section" value={values.section} required>
                                <option value="">--Select--</option>
                                {
                                    sections.map((section, index) => <option key={index} value={section}>{section}</option>)
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select Section</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className='mandatory'>Father's Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter father's name" name="fathername" value={values.fathername} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">Please enter father's name</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className='mandatory'>Mother's Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter mother's name" name="mothername" value={values.mothername} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">Please enter mother's name</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className='mandatory'>Primary Contact Number</Form.Label>
                            <Form.Control required type="phone" maxLength={10} onKeyDown={handleKeyDown} placeholder="Enter primary contact number" name="primarycontact" value={values.primarycontact} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">Please primary contact number</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Secondary Contact Number (Optional)</Form.Label>
                            <Form.Control type="phone" maxLength={10} onKeyDown={handleKeyDown} placeholder="Enter secondary contact number" name="secondarycontact" value={values.secondarycontact} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">Please secondary contact number</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className='mandatory'>Address 1</Form.Label>
                            <Form.Control required type="text" placeholder="Enter address" name="address1" value={values.address1} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">Please address1</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className='mandatory'>Address 2</Form.Label>
                            <Form.Control type="text" placeholder="Enter pincode" name="address2" value={values.address2} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">Please address2</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <CasecadingDropDown
                    casecadeSelectedCountry={casecadeSelectedCountry}
                    casecadeSelectedState={casecadeSelectedState}
                    casecadeSelectedCity={casecadeSelectedCity}
                    country={values.country}
                    state={values.state}
                    city={values.city}
                    editForm={true}
                />
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label className='mandatory'>Pincode</Form.Label>
                        <Form.Control required type="phone" maxLength={10} onKeyDown={handleKeyDown} placeholder="Enter pincode" name="pincode" value={values.pincode} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">Please pincode</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Date of Admission</Form.Label>
                        <Form.Control type="text" disabled name="dateofadmission" value={values.dateofadmission} />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Button variant="primary" type="submit" onClick={handleUpdateStudent}>Add</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

const UpdateStudent = (props) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        props.getStudentDetailsById(id);
    }, [])

    setTimeout(() => {
        setData(props.students.studentDetails);
    }, 1000);


    setTimeout(() => {
        setLoading(false);
    }, 3000)

    return (
        <div className='container'>
            <div className='content-body'>
                <BodyHeader title="Update Student" back="admin/students" />
                <div className='content-body-container'>
                    {
                        loading ? <p>Loading...</p>
                            : data && <StudentDetails student={data} props={props} showToast={setShowToast} />
                    }
                    {showToast && <ToastContainer position="bottom-end">
                        <Toast bg={props.students.isError ? 'danger' : 'success'} variant={props.students.isError ? 'danger' : 'success'} onClose={() => setShowToast(false)} show={showToast} delay={8000} autohide={true}>
                            <Toast.Body>{props.students.responseMessage}</Toast.Body>
                        </Toast>
                    </ToastContainer>}

                    {/* <ToastContainer position="bottom-end">
                        <Toast bg='success'  onClose={() => setShowToast(false)} show={true} delay={5000} autohide={false}>
                            <Toast.Body>55555555555</Toast.Body>
                        </Toast>
                    </ToastContainer> */}
                </div>
            </div>
        </div>
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
        updateStudentData: (data) => dispatch(updateStudentApi(data)),
        getStudentDetailsById: (id) => dispatch(getStudentDetailsApi(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);