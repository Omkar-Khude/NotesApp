import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../fontStyle.css"
import backgroundImage from '../images/background1.jpeg';


const Signup = (props) => {
  const [credentials, setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
  const {name,email,password}=credentials;
  let navigate=useNavigate();

  // logic to handle form submit and create user api call
  const handleSubmit=async(e)=>{
      e.preventDefault();
      const response= await fetch(`http://localhost:5000/api/auth/createUser`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({name,email,password})
        });
        const json=await response.json()
        console.log(json)
          localStorage.setItem('token',json.authtoken);
          navigate('/home');
          props.showAlert("Account Created Successfully","success")
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const handleLogin=()=>{
    navigate('/login');
  }

  return (
    <div style={{
     
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '93vh',
      overflow: 'hidden',
      
    }}>
<h2 className="fancy-title row h-100 justify-content-center align-items-center my-5 ">Create account to use NotesApp</h2>
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col-md-4">

        <div className="card my-2">
          <div className="card-body">
            <h4 className="card-title text-center" style={{ fontSize: '28px', fontWeight: 'bold', color:'#302b2b'}}>Signup</h4>
     <form className="my-3"onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label" style={{ fontSize: '20px'}}>Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" style={{ fontSize: '20px'}}>Email address</label>
    <input type="email" className="form-control" id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="password" className="form-label" style={{ fontSize: '20px'}}>Password</label>
    <input type="password" className="form-control"  name="password"  onChange={onChange} id="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label" style={{ fontSize: '20px'}}>Confirm Password</label>
    <input type="password" className="form-control" name="cpassword"  onChange={onChange} id="cpassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary bg-dark">Signup</button>
  <div className="my-1">
  <h10 onClick={handleLogin} style={{ cursor: 'pointer' }} >Already have an account? click here to login.</h10>
  </div>
</form>
    </div>
    </div>

      </div>
    </div>
  </div>
  
  )
}

export default Signup
