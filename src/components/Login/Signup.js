import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Signup = ({formType, setFormType}) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [selectedRadio, setSelectedRadio] = useState(values.role);
    const [validated, setValidated] = useState(false);
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSwitchToLogin = () => {
        setFormType({...formType, login:true, forgot_password:false, sign_up:false});
    }
    const handleSwitchToForgotPassword = () => {
        setFormType({...formType, login:false, forgot_password:true, sign_up:false});
    }
    return (
        <div className={`login`}>
            <div className='login-form-container'>
                <Row>
                    <Col className="login-form">
                        <div className='school-logo-container'>
                            <h1>Signup</h1>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control required type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">Please enter email</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control required type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">Please enter password</Form.Control.Feedback>
                            </Form.Group>
                            {['radio'].map((type, index) => (
                                <Form.Group className="mb-3 text-align-left" key={index}>
                                    <Form.Group className="mb-12" >
                                        <Form.Check
                                            required
                                            inline
                                            label="Admin"
                                            name="role"
                                            type={type}
                                            value="admin"
                                            checked={selectedRadio === 'admin'}
                                            onChange={handleRadioChange}
                                            id={`inline-${type}-1`}
                                        />
                                        <Form.Check
                                            required
                                            inline
                                            label="Student"
                                            name="role"
                                            type={type}
                                            checked={selectedRadio === 'student'}
                                            onChange={handleRadioChange}
                                            value="student"
                                            id={`inline-${type}-2`}
                                        />
                                        <Form.Control.Feedback type="invalid">Role should be selected</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Group>
                            ))}
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Create
                                </Button>
                                <div className="login-footer-links">
                                    <div onClick={handleSwitchToForgotPassword} className='link'>Forgot Password?</div>
                                    <div>Already have account? <span className='link' onClick={handleSwitchToLogin}>Login</span></div>
                                </div>
                            </div>
                        </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Signup