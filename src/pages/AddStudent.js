import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { postStudentApi, getStudentsApi } from '../redux/actions';
import { connect } from 'react-redux';
import placeHolder from '../images/student_placeholder-02-01.jpg';
import BodyHeader from '../components/BodyHeader';
import CasecadingDropDown from '../components/CasecadingDropDown';


const AddStudent = (props) => {
    const initialValues = {
        photo: '',
        name: '',
        gender: '',
        grade: '',
        section: '',
        fathername: '',
        mothername: '',
        primarycontact: '',
        secondarycontact: '',
        dateofadmission: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        pincode: ''

    }
    const [values, setValues] = useState({
        photo: '',
        name: '',
        gender: '',
        grade: '',
        section: '',
        fathername: '',
        mothername: '',
        primarycontact: '',
        secondarycontact: '',
        dateofadmission: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
    });
    const grades = [5, 6, 7, 8, 9, 10, 11, 12];
    const sections = ['A', 'B', 'C', 'D', 'E'];

    const countries = [
        {
            name: "India",
            states: [
                {
                    name: "Tamilnadu",
                    cities: [
                        {
                            name: "Chennai"
                        },
                        {
                            name: "Hosur"
                        }
                    ]
                },
                {
                    name: "Karnataka",
                    cities: [
                        {
                            name: "Bangalore"
                        },
                        {
                            name: "Hobli"
                        }
                    ]
                }
            ]
        },
        {
            name: "USA",
            states: [
                {
                    name: "Florida",
                    cities: [
                        {
                            name: "Tampa"
                        },
                        {
                            name: "Maryland"
                        }
                    ]
                },
                {
                    name: "Texas",
                    cities: [
                        {
                            name: "Irving"
                        },
                        {
                            name: "Houston"
                        }
                    ]
                }
            ]
        }
    ]

    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [validated, setValidated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [displayPhoto, setDisplayPhoto] = useState('');
    const [toggleDisplayPhoto, setToggleDisplayPhoto] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState(values.gender);

    let dateofadmission = new Date().toLocaleDateString();
    const fileRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setToggleDisplayPhoto(true);
        setValues({ ...values, dateofadmission: dateofadmission })
    }, [])
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setValidated(true);
        if (values.name === '' && values.grade === '' && values.section === '') {
            return false;
        } else {
            console.log(values)
            props.addStudent(values);
        }

        if (props.students.responseSuccess) {
            setShowToast(true);
            setValidated(false);
            setTimeout(() => {
                navigate('/admin/students');
                props.getStudents();
            }, 5000)
        }
    }
    const handleReset = () => {
        setValues(initialValues);
        setToggleDisplayPhoto(true);
        fileRef.current.value = '';
    }
    const handlePhotoChange = (e) => {
        let image = e.target.files[0];
        setValues({ ...values, photo: image ? image : '' })
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setDisplayPhoto(reader.result);
        }
        setToggleDisplayPhoto(false);
    }

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleKeyDown = (e) => {
        if (isNaN(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    }

    const casecadeSelectedCountry = (e, selectedValues) => {
        setValues({ ...values, [e.target.name]: selectedValues.country })
    }
    const casecadeSelectedState = (e, selectedValues) => {
        setValues({ ...values, [e.target.name]: selectedValues.state === 'Select State' ? '' :  selectedValues.state})
    }
    const casecadeSelectedCity = (e, selectedValues) => {
        setValues({ ...values, [e.target.name]: selectedValues.city === 'Select City' ? '' :  selectedValues.city})
    }

    return (
        <div className='container'>
            <div className='content-body'>
                <BodyHeader title="Add Student" back="admin/students" />
                <div className='content-body-container'>
                    <Form noValidate validated={validated} encType={'multipart/form-data'}>
                        <Row>
                            <Form.Label>Photo</Form.Label>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <div className='student-photo'>
                                    {toggleDisplayPhoto ? <img src={placeHolder} width="150" height="150" /> : <img src={displayPhoto} width="150" height="150" />}
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className='student-photo'>
                                    <label className="drop-container">
                                        <Form.Control ref={fileRef} type="file" accept="image/*" name="photo" onChange={handlePhotoChange} />
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
                                <Form.Check required inline label="Male" name="gender" type="radio" value="male" checked={selectedRadio === 'male'} onChange={handleRadioChange} />
                                <Form.Check required inline label="Female" name="gender" type="radio" value="female" checked={selectedRadio === 'female'} onChange={handleRadioChange} />
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
                                    <Form.Control  type="text" placeholder="Enter pincode" name="address2" value={values.address2} onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">Please address2</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <CasecadingDropDown
                            casecadeSelectedCountry={casecadeSelectedCountry}
                            casecadeSelectedState={casecadeSelectedState}
                            casecadeSelectedCity={casecadeSelectedCity}
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
                                <Form.Control type="text" disabled name="dateofadmission" value={dateofadmission} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>Add</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    {showToast && <ToastContainer position="bottom-end">
                        <Toast bg={props.students.isError ? 'danger' : 'success'} variant={props.students.isError ? 'danger' : 'success'} onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide={true}>
                            <Toast.Body>{props.students.responseMessage}</Toast.Body>
                        </Toast>
                    </ToastContainer>}
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
        addStudent: (values) => dispatch(postStudentApi(values))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);