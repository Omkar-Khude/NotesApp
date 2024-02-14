import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
          navigate('/');
          props.showAlert("Account Created Successfully","success")
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div>
<h2 className="row h-100 justify-content-center align-items-center my-2">Create account to use iNotebook</h2>
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col-md-4">

        <div className="card my-4">
          <div className="card-body">
            <h4 className="card-title text-center">Signup</h4>
     <form className="my-3"onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  name="password"  onChange={onChange} id="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword"  onChange={onChange} id="cpassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Signup</button>
</form>
    </div>
    </div>

      </div>
    </div>
  </div>
  
  )
}

export default Signup
