import React, {useState} from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../../contextapi/AuthContext';


const Login = ({formType, setFormType}) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [selectedRadio, setSelectedRadio] = useState(values.role);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, login, loggedIn } = useAuth();
    const [logging, setLogging] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (values.email === '' && values.password === '') {
            return false;
        } else {
            login(true);
            loggedIn(selectedRadio);
            setLogging(true);
            setTimeout(()=>{
                //navigate('dashboard');
                
                if(selectedRadio === 'admin'){
                    console.log('1')
                    navigate('/admin/dashboard', {replace: true});
                }else if(selectedRadio === 'student'){
                    console.log('2')
                    navigate('/student/dashboard' , {replace: true})
                }else{
                    console.log('3')
                    //navigate('/')
                }
                
                //selectedRadio === 'admin' ? <Navigate to='dashboard'/> : <Navigate to='/student/dashboard'/> ;
            }, 9000)
            
        }
    };

    const handleSwitchToForgotPassword = () => {
        setFormType({...formType, forgot_password:true, login:false})
    }
    const handleSwitchToSignup = () => {
        setFormType({...formType, login:false, forgot_password:false, sign_up:true});
    }

    return (
        <div className={`login`}>
            <div className='login-form-container'>
                <Row>
                    <Col className="login-form">
                        <div className='school-logo-container'>
                            <h1>Login</h1>
                        </div>
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
                                <Form.Group className="mb-3" key={index}>
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
                                <Button variant="primary" type="submit" disabled={logging? true : false}>
                                    {logging ? <span>Logging...</span> : <span>Login</span>}
                                </Button>
                                <div className="login-footer-links">
                                    <div onClick={logging ? null : handleSwitchToForgotPassword} className={`link ${logging ? 'disablelink' : ''}`}>Forgot Password?</div>
                                    <div>Don't have account? <span className={`link ${logging ? 'disablelink' : ''}`} onClick={logging ? null : handleSwitchToSignup}>Sign Up</span></div>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
            
        </div>
    )
}

export default Login