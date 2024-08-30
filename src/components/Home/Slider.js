import React from 'react'
import background from '../../images/slider1.jpg';
import { NavLink } from 'react-router-dom';

const Slider = () => {
    const myStyle = {
        backgroundImage: `url(${background})`,
        height: "450px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };
  return (
    <div className='slider'>
                <div className='slider-text-content'>
                    <h1>
                        “Go Beyond The Usual, <br />Strive For The Ultimate Goal.”
                    </h1>
                    <p>
                        We’re redefining schooling years for our students by improving not just the knowledge delivery but enhancing your child’s pool of talent.
                    </p>
                    <NavLink to="about">Read More</NavLink>
                </div>
                <div className='slider-inner' style={myStyle}></div>
            </div>
  )
}

export default Slider