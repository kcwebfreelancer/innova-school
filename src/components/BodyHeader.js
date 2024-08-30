import React from 'react';
import {useNavigate} from 'react-router-dom';

const BodyHeader = ({ title, numberOfStudents, back}) => {
    const navigate = useNavigate();

    let listCount = numberOfStudents == 0 ? null : `(${numberOfStudents})`;
    return (
        <div className='content-body-header'>
            {title}  { numberOfStudents ? listCount : null}
            {back && <button className='back-button' onClick={()=> navigate(`/${back}`)}><i className='fa fa-arrow-left'></i>Back</button>}
        </div>
    )
}

export default BodyHeader