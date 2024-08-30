import React from 'react';
import student from '../../images/student.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Highlights = () => {
    return (
        <div className="hightlight">
            <Row>
                <Col>
                    <div className='counts'>
                        <div className='count-item'>
                            <h3>35</h3>
                            <p>Successful Years</p>
                        </div>
                        <div className='count-item'>
                            <h3>15000</h3>
                            <p>Students</p>
                        </div>
                        <div className='count-item'>
                            <h3>6</h3>
                            <p>Campuses</p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <img src={student} className="hightlight-image" />
                </Col>
            </Row>
        </div>
    )
}

export default Highlights