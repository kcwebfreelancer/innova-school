import React from 'react';
import Logo from '../images/school_logo_5.svg';
import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
        <footer>
            <Container fluid>
            <img src={Logo} className='logo'/>
            </Container>
        </footer>
    )
}

export default Footer