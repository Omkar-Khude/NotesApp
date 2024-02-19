import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../images/slide 1.jpg';
import image2 from '../images/slide 2.webp';
import image3 from '../images/slide 3.jpg';
import "../fontStyle.css"
import {useNavigate } from "react-router-dom";
const DisplayPage = () => {
  let navigate=useNavigate()
  const handleSignUp=()=>{
    navigate('/signup') 
    }

  const settings = {
    // dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000 // Adjust speed as needed
  };

  return (
    <div style={{overflow: 'hidden', height: '93vh',}}>
      <Slider {...settings}>

        <div>
          <img src={image1} alt="Slide 1" style={{ width: '104%', height: '95%', objectFit: 'cover', objectPosition: 'center' }}/>
        </div>

        <div>
          <img src={image2} alt="Slide 2" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}/>
        </div>

        <div>
          <img src={image3} alt="Slide 3" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}/>
        </div>
      </Slider>
      <div className="centered" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 999 }}>
        <h2>NotesApp - Store Your Notes Online</h2>
        <button className="btn btn-primary bg-dark btn-lg" onClick={handleSignUp}>Get Started</button>
      </div>
    </div>
  );
}

export default DisplayPage;