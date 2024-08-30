import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ForgotPassword = ({formType, setFormType}) => {
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        email: ''
    });
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const handleSwitchToLogin = () => {
        setFormType({...formType, login:true, forgot_password: false});
    }
    const handleSwitchToSignup = () => {
        setFormType({...formType, login:false, forgot_password:false, sign_up:true})
    }
    return (
        <div className={`login`}>
            <div className='login-form-container'>
                <Row>
                    <Col className="login-form">
                        <div className='school-logo-container'>
                            <h1>Forgot Password</h1>
                            <p>Please enter your email to receive the resent password link.</p>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control required type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">Please enter email</Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">
                                        Reset Password
                                    </Button>
                                    <div className="login-footer-links">
                                        <div>Already have an account? <span className='link' onClick={handleSwitchToLogin}>Login</span></div>
                                        <div>Don't have account? <span className='link' onClick={handleSwitchToSignup}>Sign Up</span></div>
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

export default ForgotPassword