import React from 'react'
import "../fontStyle.css"
import backgroundImage from '../images/background1.jpeg';
const About = () => {
  return (
    <div style={{
     
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '93vh',
      overflow: 'hidden',
      
    }}>
    <div className="container mt-5">
      <h2 className=" fancy-title row h-100 justify-content-center align-items-center">About NotesApp</h2>
      <div className="accordion my-4" id="accordionExample" >
      <div className="accordion-item ">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" >
      <strong  style={{fontSize:'22px'}}>About Us</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapsed" data-bs-parent="#accordionExample">
      <div className="accordion-body">

      <p style={{fontSize:'18px'}}>Welcome to <strong>NotesApp</strong>, your go-to destination for effortless note-taking and organization. We understand the importance of capturing ideas and information seamlessly, which is why we've created a platform designed to simplify your note-taking experience.</p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" >
      <strong style={{fontSize:'22px'}}>Key Features</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapsed" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        
        <li style={{fontSize:'18px'}}>Effortless Note Creation</li>
    <li style={{fontSize:'18px'}}>User-Friendly Interface</li>
    <li style={{fontSize:'18px'}}>Customization Options</li>
    <li style={{fontSize:'18px'}}>Security and Privacy</li>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" >
      <strong style={{fontSize:'22px'}}>Get Started Today</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapsed" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      
      <p style={{fontSize:'18px'}}>Ready to revolutionize the way you take and manage your notes? Sign up for a free account today and experience the difference with <strong>NotesApp</strong>.</p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed">
      <strong style={{fontSize:'22px'}}>Contact Us</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapsed" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       
        <p style={{fontSize:'18px'}}>Have questions, feedback, or suggestions? We'd love to hear from you! Reach out to us.</p>
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default About
