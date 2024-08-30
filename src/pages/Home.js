import React from 'react'
import { NavLink } from 'react-router-dom';
import Slider from '../components/Home/Slider';
import WelcomeMessage from '../components/Home/WelcomeMessage';
import Highlights from '../components/Home/Highlights';
import Branches from '../components/Home/Branches';

export const Home = () => {


    return (
        <>
            <Slider />
            <WelcomeMessage />
            <Highlights />
            <Branches />
            <div className='admissions-enquiry'>
                <div className='container'>
                    <h1>Admissions Open for 2024-2025</h1>
                    <NavLink>Read More</NavLink>
                </div>
            </div>
        </>

    )
}
